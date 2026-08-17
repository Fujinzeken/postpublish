/*
  PostPublish mark: two stacked cards with the top one lifting up and to the
  right. One post leaving the queue, which is the whole product in one glyph.
*/
export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 40 40"
        className="h-[26px] w-[26px] shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="40" height="40" rx="11" fill="#1c1917" />
        {/* The queue */}
        <rect
          x="8.5"
          y="19"
          width="17"
          height="12.5"
          rx="3.5"
          fill="#ffffff"
          opacity="0.3"
        />
        {/* The post going out */}
        <rect
          x="14.5"
          y="9.5"
          width="17"
          height="12.5"
          rx="3.5"
          fill="#dc4a28"
        />
      </svg>
      <span className="font-display text-[17px] font-semibold tracking-tight text-foreground">
        PostPublish
      </span>
    </span>
  );
}
