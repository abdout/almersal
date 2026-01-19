'use client';

interface GridItem {
  id: string;
  color: string;
}

const gridItems: GridItem[] = [
  { id: 'a', color: '#E8E8E8' },
  { id: 'b', color: '#D0D0D0' },
  { id: 'c', color: '#B8B8B8' },
  { id: 'd', color: '#909090' },
  { id: 'e', color: '#A0A0A0' },
  { id: 'tall', color: '#F5F5F5' },
  { id: 'g', color: '#C8C8C8' },
  { id: 'h', color: '#686868' },
  { id: 'i', color: '#989898' },
  { id: 'j', color: '#E0E0E0' },
  { id: 'k', color: '#C0C0C0' },
];

function GridImage({
  item,
  className = '',
}: {
  item: GridItem;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{
        backgroundColor: item.color,
      }}
    />
  );
}

export function PhotoGridSection() {
  const getItem = (id: string) => gridItems.find(item => item.id === id)!;

  return (
    <section className="relative px-4 md:px-5 py-4">
      {/*
        3 MAIN COLUMNS: LEFT (38%) | MID (24%) | RIGHT (38%)

        ┌──────────────┬──────────┬──────────────┐
        │    LEFT      │   MID    │    RIGHT     │
        │    38%       │   24%    │    38%       │
        ├──────┬───────┼──────────┼──────────────┤
        │  a   │   b   │    c     │              │
        ├──────┴───────┼──────────┤    tall      │
        │      d       │    e     │              │
        └──────────────┴──────────┴──────────────┘
        ┌────────┬─────────┬─────────┬───────────┐
        │   g    │    h    │    i    │     j     │
        └────────┴─────────┴─────────┴───────────┘
      */}
      <div className="w-full h-[120vh] flex flex-col gap-4 md:gap-5">
        {/* TOP: 3 main columns using CSS Grid */}
        <div
          className="flex-[2.5] grid gap-4 md:gap-5"
          style={{
            gridTemplateColumns: '38fr 24fr 38fr',
          }}
        >
          {/* LEFT (38%): [a 40%][b 60%] top 40%, [d] bottom 60% */}
          <div className="flex flex-col gap-4 md:gap-5">
            <div className="flex-[4] flex gap-4 md:gap-5">
              <GridImage
                item={getItem('a')}
                className="flex-[4]"
              />
              <GridImage
                item={getItem('b')}
                className="flex-[6]"
              />
            </div>
            <GridImage
              item={getItem('d')}
              className="flex-[6]"
            />
          </div>

          {/* MID (24%): [c 60%] top, [e 40%] bottom */}
          <div className="flex flex-col gap-4 md:gap-5">
            <GridImage
              item={getItem('c')}
              className="flex-[6]"
            />
            <GridImage
              item={getItem('e')}
              className="flex-[4]"
            />
          </div>

          {/* RIGHT (38%): [tall] full height */}
          <GridImage
            item={getItem('tall')}
          />
        </div>

        {/* BOTTOM: 4 items */}
        <div className="flex-[1.3] flex gap-4 md:gap-5">
          <GridImage
            item={getItem('g')}
            className="flex-[1.3]"
          />
          <GridImage
            item={getItem('h')}
            className="flex-[0.9]"
          />
          <GridImage
            item={getItem('i')}
            className="flex-[1.3]"
          />
          <div className="flex-[0.8] flex flex-col gap-4 md:gap-5">
            <GridImage
              item={getItem('j')}
              className="flex-1"
            />
            <GridImage
              item={getItem('k')}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
