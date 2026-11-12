import Markdoc, { type Node } from "@markdoc/markdoc";
import React from "react";

/** Renders a Keystatic Markdoc article with the site's typography. */
export default function Article({ node }: { node: Node }) {
  const content = Markdoc.transform(node);
  return (
    <div
      className={[
        "flex flex-col gap-5 text-[19px] leading-[1.7] text-[#2B3036]",
        "[&_h2]:mt-6 [&_h2]:text-[clamp(26px,2.6vw,34px)] [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:tracking-[-0.03em] [&_h2]:text-ink",
        "[&_h3]:mt-4 [&_h3]:text-[22px] [&_h3]:font-bold [&_h3]:tracking-[-0.02em] [&_h3]:text-ink",
        "[&_ul]:flex [&_ul]:list-none [&_ul]:flex-col [&_ul]:gap-3 [&_ul]:pl-0",
        "[&_ul>li]:relative [&_ul>li]:pl-5 [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[0.7em] [&_ul>li]:before:h-1.5 [&_ul>li]:before:w-1.5 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-brand",
        "[&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-3 [&_ol]:pl-6 [&_ol>li]:marker:font-semibold [&_ol>li]:marker:text-brand",
        "[&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-brand [&_blockquote]:pl-6 [&_blockquote]:text-[clamp(22px,2.2vw,28px)] [&_blockquote]:font-semibold [&_blockquote]:leading-snug [&_blockquote]:tracking-[-0.02em] [&_blockquote]:text-ink",
        "[&_a]:font-semibold [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4",
        "[&_strong]:font-semibold [&_strong]:text-ink",
        "[&_img]:my-4 [&_img]:w-full [&_img]:rounded-2xl",
        "[&_hr]:my-6 [&_hr]:border-line",
        "[&_code]:rounded [&_code]:bg-paper [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em]",
        "[&_table]:w-full [&_table]:border-collapse [&_table]:text-[16px] [&_td]:border [&_td]:border-line [&_td]:p-3 [&_th]:border [&_th]:border-line [&_th]:bg-paper [&_th]:p-3 [&_th]:text-left",
      ].join(" ")}
    >
      {Markdoc.renderers.react(content, React)}
    </div>
  );
}
