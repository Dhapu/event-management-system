import Link from "next/link";

type PaginationControlsProps = {
  page: number;
  totalPages: number;
  pathname: string;
  searchParams: Record<string, string | string[] | undefined>;
};

export function PaginationControls({ page, totalPages, pathname, searchParams }: PaginationControlsProps) {
  const createPageHref = (targetPage: number) => {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (typeof value === "string" && value.length > 0 && key !== "page") {
        params.set(key, value);
      }
    });

    params.set("page", String(targetPage));
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-between rounded-3xl border border-border/60 bg-card px-5 py-4 shadow-soft">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-3">
        <Link
          href={createPageHref(Math.max(1, page - 1))}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium"
          aria-disabled={page <= 1}
        >
          Previous
        </Link>
        <Link
          href={createPageHref(Math.min(totalPages, page + 1))}
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          aria-disabled={page >= totalPages}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
