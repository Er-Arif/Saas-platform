import { ConsoleShell } from "../../../components/console-shell";
import { getCatalogProducts, getPortalTickets } from "../../../lib/platform";

export default async function DashboardSupportPage({
  searchParams,
}: {
  searchParams?: Promise<{ success?: string; error?: string }>;
}) {
  const [params, tickets, products] = await Promise.all([
    searchParams ?? Promise.resolve({} as { success?: string; error?: string }),
    getPortalTickets(),
    getCatalogProducts(),
  ]);

  return (
    <ConsoleShell
      title="Support workspace"
      description="Create organization-linked tickets and review their current status from the same unified app."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Open tickets</h2>
          <div className="mt-5 space-y-3">
            {tickets.map((ticket) => (
              <div className="rounded-2xl border border-slate-200 p-4" key={ticket.id}>
                <p className="text-sm font-semibold text-slate-950">{ticket.subject}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {ticket.status} • {ticket.priority}
                </p>
              </div>
            ))}
          </div>
        </div>
        <form action="/api/support/tickets" className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Create ticket</h2>
          {params.success ? (
            <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Ticket created successfully.
            </p>
          ) : null}
          {params.error ? (
            <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {params.error}
            </p>
          ) : null}
          <div className="mt-5 grid gap-4">
            <select className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="product_id">
              <option value="">Choose a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="subject" placeholder="Subject" required />
            <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="category" placeholder="Category" required />
            <select className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" defaultValue="medium" name="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
            <textarea className="min-h-36 rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="message" placeholder="Describe the issue" required />
          </div>
          <button className="mt-6 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white" type="submit">
            Create support ticket
          </button>
        </form>
      </div>
    </ConsoleShell>
  );
}
