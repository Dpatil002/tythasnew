import { ButtonLink, SelectionBox } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="grid-canvas flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <SelectionBox className="px-6 py-2">
        <h1 className="text-[clamp(64px,10vw,140px)] font-extrabold leading-none tracking-tightest">404.</h1>
      </SelectionBox>
      <p className="text-xl text-body">This page took a wrong turn. Let&apos;s get you back on track.</p>
      <ButtonLink href="/">Back to home</ButtonLink>
    </section>
  );
}
