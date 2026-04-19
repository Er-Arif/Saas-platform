import clsx from "clsx";
import type { PropsWithChildren, ReactNode } from "react";

export function cn(...classes: Array<string | false | null | undefined>) {
  return clsx(classes);
}

export function Button({
  children,
  href,
  tone = "primary",
  className
}: PropsWithChildren<{
  href?: string;
  tone?: "primary" | "secondary" | "ghost";
  className?: string;
}>) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition",
    tone === "primary" && "bg-brand-600 text-white hover:bg-brand-700 shadow-glow",
    tone === "secondary" && "bg-white text-ink ring-1 ring-slate-200 hover:bg-slate-50",
    tone === "ghost" && "text-slate-700 hover:text-brand-700",
    className
  );

  if (href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }

  return <button className={classes}>{children}</button>;
}

export function Section({
  eyebrow,
  title,
  description,
  actions,
  children,
  className
}: PropsWithChildren<{
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}>) {
  return (
    <section className={cn("mx-auto max-w-7xl px-6 py-16 lg:px-10", className)}>
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-950 lg:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-7 text-slate-600 lg:text-lg">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function MetricCard({
  label,
  value,
  detail
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-950">{value}</p>
      {detail ? <p className="mt-2 text-sm text-slate-600">{detail}</p> : null}
    </div>
  );
}

export function FeatureCard({
  title,
  description,
  meta
}: {
  title: string;
  description: string;
  meta?: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
      {meta ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{meta}</p> : null}
      <h3 className="mt-3 text-xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

export function DataTable({
  title,
  columns,
  rows
}: {
  title: string;
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
                  key={column}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr key={`${title}-${index}`}>
                {row.map((cell, cellIndex) => (
                  <td className="px-6 py-4 text-sm text-slate-700" key={`${title}-${index}-${cellIndex}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

