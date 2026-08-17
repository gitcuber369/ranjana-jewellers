import Image from "next/image";

type Tile = { label: string; image?: string };

function GridTile({ label, image, className }: Tile & { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-pink-100 ${className ?? ""}`}>
      {image && <Image src={image} alt={label} fill className="object-cover" />}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
      <span className="absolute bottom-4 left-4 font-serif text-lg text-white">{label}</span>
    </div>
  );
}

export default function ImageGrid({
  tiles,
  layout,
}: {
  tiles: Tile[];
  layout: "asymmetric" | "grid-2x2" | "grid-3-photo" | "grid-5-photo";
}) {
  if (layout === "asymmetric") {
    const [large, ...rest] = tiles;
    return (
      <div className="grid h-[340px] grid-cols-2 grid-rows-2 gap-3 sm:h-[500px] sm:gap-4">
        <GridTile label={large.label} image={large.image} className="row-span-2" />
        {rest.map((tile) => (
          <GridTile key={tile.label} label={tile.label} image={tile.image} />
        ))}
      </div>
    );
  }

  if (layout === "grid-3-photo") {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {tiles.map((tile) => (
          <GridTile key={tile.label} label={tile.label} image={tile.image} className="aspect-[3/4]" />
        ))}
      </div>
    );
  }

  if (layout === "grid-5-photo") {
    return (
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {tiles.map((tile) => (
          <GridTile key={tile.label} label={tile.label} image={tile.image} className="aspect-[4/5]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {tiles.map((tile) => (
        <GridTile key={tile.label} label={tile.label} image={tile.image} className="aspect-[4/3]" />
      ))}
    </div>
  );
}
