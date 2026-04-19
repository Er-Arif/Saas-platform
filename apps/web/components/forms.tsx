export function InquiryForm({
  title,
  description,
  fields
}: {
  title: string;
  description: string;
  fields: string[];
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="font-display text-2xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      <form className="mt-8 grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label className="grid gap-2 text-sm font-medium text-slate-700" key={field}>
            {field}
            <input
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none ring-brand-200 transition focus:ring-4"
              name={field}
              placeholder={`Enter ${field.toLowerCase()}`}
            />
          </label>
        ))}
        <label className="grid gap-2 text-sm font-medium text-slate-700 md:col-span-2">
          Message
          <textarea
            className="min-h-32 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none ring-brand-200 transition focus:ring-4"
            placeholder="Tell us about your requirements."
          />
        </label>
        <button
          className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 md:col-span-2 md:w-fit"
          type="submit"
        >
          Submit Inquiry
        </button>
      </form>
    </div>
  );
}

