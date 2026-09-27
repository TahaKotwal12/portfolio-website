export function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="grid-backdrop absolute inset-0" />
      <div className="absolute left-1/2 top-[-10%] size-[60rem] -translate-x-1/2 rounded-full bg-accent-2/20 blur-[140px] dark:bg-accent-2/15" />
      <div className="absolute right-[-10%] top-[30%] size-[40rem] rounded-full bg-accent/10 blur-[140px]" />
    </div>
  );
}
