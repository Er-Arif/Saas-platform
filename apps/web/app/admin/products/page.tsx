import { ConsoleShell } from "../../../components/console-shell";
import { getAdminProducts, getAdminStats } from "../../../lib/platform";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ success?: string; error?: string }>;
}) {
  const params = (await searchParams) ?? {};

  let stats = null;
  let products = null;
  let errorMessage = params.error;

  try {
    [stats, products] = await Promise.all([getAdminStats(), getAdminProducts()]);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Admin data could not be loaded";
  }

  return (
    <ConsoleShell
      scope="admin"
      title="Admin product operations"
      description="Create products, upload releases, and manage the live software catalog from the same main website."
    >
      {params.success ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {params.success === "product-created" ? "Product created successfully." : "Release uploaded successfully."}
        </div>
      ) : null}
      {errorMessage ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {errorMessage}. Log in with the seeded admin account to manage products.
        </div>
      ) : null}
      {stats ? (
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Products</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{stats.products}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Customers</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{stats.customers}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Licenses</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{stats.licenses}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Leads</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{stats.leads}</p>
          </div>
        </div>
      ) : null}
      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <form action="/api/admin/products" className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Create product</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm md:col-span-2" name="name" placeholder="Product name" required />
            <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="slug" placeholder="Slug" required />
            <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="category_name" placeholder="Category" required />
            <select className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" defaultValue="desktop_software" name="type">
              <option value="desktop_software">Desktop software</option>
              <option value="web_software">Web software</option>
              <option value="enterprise_solution">Enterprise solution</option>
              <option value="downloadable_tool">Downloadable tool</option>
            </select>
            <select className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" defaultValue="monthly_subscription" name="pricing_model">
              <option value="one_time">One time</option>
              <option value="monthly_subscription">Monthly subscription</option>
              <option value="yearly_subscription">Yearly subscription</option>
              <option value="custom_quote">Custom quote</option>
              <option value="freemium">Freemium</option>
            </select>
            <select className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" defaultValue="downloadable" name="deployment_type">
              <option value="downloadable">Downloadable</option>
              <option value="hosted">Hosted</option>
              <option value="on_premise">On premise</option>
              <option value="custom_deployment">Custom deployment</option>
            </select>
            <select className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" defaultValue="license_based" name="access_model">
              <option value="license_based">License based</option>
              <option value="subscription_based">Subscription based</option>
              <option value="hybrid">Hybrid</option>
              <option value="external_deployment">External deployment</option>
            </select>
            <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm md:col-span-2" name="short_description" placeholder="Short description" required />
            <textarea className="min-h-36 rounded-2xl border border-slate-200 px-4 py-3 text-sm md:col-span-2" name="long_description" placeholder="Long description" required />
            <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="support_model" placeholder="Support model" />
            <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="documentation_link" placeholder="Documentation link" />
            <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm md:col-span-2" name="platform_compatibility" placeholder="Platform compatibility, comma separated" />
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input name="featured" type="checkbox" />
              Featured product
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input name="enterprise_custom" type="checkbox" />
              Enterprise custom
            </label>
          </div>
          <button className="mt-6 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white" type="submit">
            Create product
          </button>
        </form>
        <form action="/api/admin/releases" className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm" encType="multipart/form-data">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Upload release</h2>
          <div className="mt-5 grid gap-4">
            <select className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="product_id" required>
              <option value="">Choose product</option>
              {(products ?? []).map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="version" placeholder="Version, e.g. 3.3.0" required />
            <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="platform" placeholder="Platform, e.g. Windows" required />
            <textarea className="min-h-32 rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="release_notes" placeholder="Release notes" required />
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input defaultChecked name="is_latest" type="checkbox" />
              Mark as latest release
            </label>
            <input accept=".exe,.msi,.zip,.txt,.pkg,.deb" className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="installer" required type="file" />
          </div>
          <button className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white" type="submit">
            Upload release
          </button>
        </form>
      </div>
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-display text-2xl font-semibold text-slate-950">Current catalog</h2>
        <div className="mt-5 space-y-3">
          {(products ?? []).map((product) => (
            <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between" key={product.id}>
              <div>
                <p className="text-sm font-semibold text-slate-950">{product.name}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {product.slug} • {product.access_model} • {product.pricing_model}
                </p>
              </div>
              <p className="text-sm text-slate-600">{product.status}</p>
            </div>
          ))}
        </div>
      </div>
    </ConsoleShell>
  );
}
