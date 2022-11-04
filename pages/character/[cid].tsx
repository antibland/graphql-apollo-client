import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCharacter } from "../../hooks/useCharacter";
import styles from "../../styles/Home.module.css";

interface IKeys {
  id: string;
  name: string;
  episode: string;
}

const Character = () => {
  const router = useRouter();
  const { cid } = router.query;
  const { error, loading, data } = useCharacter(Number(cid));
  console.log(error, loading, data);
  if (loading) return <div>Fetching data. Hold on a sec…</div>;
  if (error) return <div>An error occurred</div>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Character stats</title>
        <meta name="description" content="Character stats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="characterCard">
        <div className="header">{data.character.name}</div>
        <div className="profile">
          <Image
            src={data.character.image}
            width={300}
            height={0}
            alt={data.character.name}
            style={{ height: "auto" }}
          />
        </div>
        <div className="episodes">
          <h3>Episode Appearances</h3>
          <div className="content">
            {data.character.episode.map(
              ({ id, name, episode }: IKeys, idx: number) => {
                return (
                  <span key={`${id}-${episode}`}>
                    {name}
                    {idx < data.character.episode.length - 1 && ","}
                  </span>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
