type SearchFiltersProps = {
  defaultValues: {
    search?: string;
    category?: string;
    location?: string;
    date?: string;
  };
};

export function SearchFilters({ defaultValues }: SearchFiltersProps) {
  return (
    <form className="grid gap-4 rounded-[28px] border border-border/60 bg-card p-5 shadow-soft md:grid-cols-4">
      <input
        type="text"
        name="search"
        defaultValue={defaultValues.search}
        placeholder="Search events"
        className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
      />
      <input
        type="text"
        name="category"
        defaultValue={defaultValues.category}
        placeholder="Category"
        className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
      />
      <input
        type="text"
        name="location"
        defaultValue={defaultValues.location}
        placeholder="Location"
        className="rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
      />
      <div className="flex gap-3">
        <input
          type="date"
          name="date"
          defaultValue={defaultValues.date}
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
        />
        <button
          type="submit"
          className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          Apply
        </button>
      </div>
    </form>
  );
}
