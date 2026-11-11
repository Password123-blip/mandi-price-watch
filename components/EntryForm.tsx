"use client";

import { useState } from "react";
import { supabase, TABLE, isConfigured } from "@/lib/supabase";

type FieldDef = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
};

const FIELDS: FieldDef[] = [{"name": "crop", "label": "Crop", "type": "text", "required": true, "placeholder": "Wheat, onion, soybean\u2026"}, {"name": "mandi", "label": "Mandi / market", "type": "text", "required": true, "placeholder": "Karnal, Lasalgaon\u2026"}, {"name": "price_per_quintal", "label": "Price per quintal (\u20b9)", "type": "number", "required": true}, {"name": "quoted_on", "label": "Quoted on", "type": "date", "required": true}, {"name": "notes", "label": "Notes", "type": "text", "required": false, "placeholder": "Grade, moisture, buyer type"}];

export default function EntryForm() {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, unknown> = {};

    for (const f of FIELDS) {
      const raw = data.get(f.name);
      if (f.type === "bool") {
        payload[f.name] = data.get(f.name) === "on";
      } else if (raw === null || raw === "") {
        if (f.required) {
          setMsg(`${f.label} is required.`);
          return;
        }
      } else if (f.type === "int") {
        payload[f.name] = parseInt(String(raw), 10);
      } else if (f.type === "number") {
        payload[f.name] = parseFloat(String(raw));
      } else {
        payload[f.name] = String(raw);
      }
    }

    if (!isConfigured) {
      setMsg("Add your Supabase keys to .env.local first.");
      return;
    }

    setBusy(true);
    setMsg(null);
    const { error } = await supabase().from(TABLE).insert(payload);
    setBusy(false);

    if (error) {
      setMsg(error.message);
      return;
    }
    form.reset();
    setMsg("Saved.");
    window.dispatchEvent(new Event("entry:created"));
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-900">Add a price entry</h2>
      <p className="mt-1 text-sm text-slate-500">
        Writes directly to the mandi_price_watch_prices table.
      </p>

      <div className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Crop</label>
            <input type="text" name="crop" placeholder="Wheat, onion, soybean…" required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Mandi / market</label>
            <input type="text" name="mandi" placeholder="Karnal, Lasalgaon…" required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Price per quintal (₹)</label>
            <input type="number" name="price_per_quintal" step="any" required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Quoted on</label>
            <input type="date" name="quoted_on" required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Notes</label>
            <input type="text" name="notes" placeholder="Grade, moisture, buyer type"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900" />
          </div>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white transition disabled:opacity-60"
        style={{ background: "var(--accent)" }}
      >
        {busy ? "Saving…" : "Save price entry"}
      </button>

      {msg && <p className="mt-3 text-sm text-slate-600">{msg}</p>}
    </form>
  );
}
