import Image from "next/image";
import Link from "next/link";
import { useCharacters } from "../hooks/useCharacters";

export default function CharacterList() {
  const { error, loading, data } = useCharacters();

  if (loading) return <div>Fetching data. Hold on a sec…</div>;
  if (error) return <div>An error occurred</div>;

  return (
    <div>
      <h2>Character List</h2>
      <div className="characterList">
        {data.characters.results.map((character: any) => {
          return (
            <div key={character.id} className="characterLinkWrapper">
              <Link
                className="characterLink"
                href={`/character/${character.id}`}
              >
                <Image
                  width={150}
                  height="0"
                  sizes="100vw"
                  className="characterImage"
                  style={{ height: "auto", maxWidth: "150px" }}
                  alt={character.name}
                  src={character.image}
                />
              </Link>
              <Link
                className="characterNameLink"
                href={`/character/${character.id}`}
              >
                <div>{character.name}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
