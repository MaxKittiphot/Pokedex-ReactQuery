"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import styles from "./page.module.css";
import { RootState } from "../redux/store";
import { increment, decrement } from "../redux/counterSlice";
import { useQuery } from "@tanstack/react-query";
import { getPokemon, getPokemonSpecies } from "./api.ts/pokemon";
import Image from "next/image";
import { PuffLoader } from "react-spinners";

const PokemonPage = () => {
  const router = useRouter();
  const count = useSelector((state: RootState) => state.counter.count); // Accessing state
  const dispatch = useDispatch(); // Dispatching actions

  const pokemonQuery = useQuery({
    queryKey: ["pokemon", count],
    queryFn: () => getPokemon(count),
  });

  const speciesPokemonQuery = useQuery({
    queryKey: ["pokemon-species", count],
    enabled: pokemonQuery?.data !== null,
    queryFn: () => getPokemonSpecies(count),
  });

  const getPicture = () => {
    if (pokemonQuery.status === "pending")
      return <PuffLoader color="#36d7b7" loading size={250} />;
    if (pokemonQuery.status === "error") return <div>error</div>;

    const {
      sprites: { front_default },
      species: { name },
    } = pokemonQuery.data;

    return (
      <Image
        src={front_default}
        height={250}
        width={250}
        alt={`The picture of ${name}`}
      />
    );
  };

  const getDetail = () => {
    if (pokemonQuery.status === "pending")
      return <PuffLoader color="#36d7b7" loading size={50} />;
    if (pokemonQuery.status === "error") return <div>error</div>;

    const { name, weight, base_experience, abilities } = pokemonQuery.data;

    return (
      <div>
        <div>{`Name: ${name}`}</div>
        <div>{`Weight: ${weight}`}</div>
        <div>{`Base EXP: ${base_experience}`}</div>
        <div>Abilities</div>
        <ul>
          {abilities.map((e: { ability: { name: string } }, index: number) => (
            <li key={index}>{e.ability.name}</li>
          ))}
        </ul>
      </div>
    );
  };

  const getSpecies = () => {
    if (speciesPokemonQuery.status === "pending")
      return <PuffLoader color="#36d7b7" loading size={50} />;
    if (speciesPokemonQuery.status === "error") return <div>error</div>;

    const { flavor_text_entries } = speciesPokemonQuery.data;
    return <div>{flavor_text_entries[0].flavor_text}</div>;
  };

  return (
    <div className={styles["pokedex-container"]}>
      <div className={styles["pokedex-container-item"]}>
        <div className={styles["black-strap-upper"]}>
          <div className={styles.profile} />
        </div>
        <div className={`${styles["black-strap-lower"]} ${styles.flexCenter}`}>
          <div>
            <div className={styles["dot-container"]}>
              <div
                className={`${styles["dot-item"]} ${styles["first-dot-item"]}`}
              ></div>
              <div className={styles["dot-item"]}></div>
              <div className={styles["dot-item"]}></div>

              <div className={styles["dot-item"]}></div>
              <div className={styles["dot-item"]}></div>
              <div className={styles["dot-item"]}></div>

              <div className={styles["dot-item"]}></div>
              <div className={styles["dot-item"]}></div>
              <div className={styles["dot-item"]}></div>
            </div>
            <div className={styles["dot-container"]}>
              <div className={styles["dot-item"]}></div>
              <div className={styles["dot-item"]}></div>
              <div className={styles["dot-item"]}></div>

              <div className={styles["dot-item"]}></div>
              <div className={styles["dot-item"]}></div>
              <div className={styles["dot-item"]}></div>

              <div className={styles["dot-item"]}></div>
              <div className={styles["dot-item"]}></div>
            </div>
          </div>
        </div>
        <div className={styles["content-container"]}>
          <div className={styles.item1}>{getPicture()}</div>
          <div className={styles.item2}>{getDetail()}</div>
          <div className={styles.item3}>{getSpecies()}</div>

          <div className={styles.item4}>
            <button
              onClick={() => dispatch(decrement())}
              className={styles.iconButton}
            >
              <BiSolidLeftArrow />
            </button>
            <div
              onClick={() => {
                router.push("/");
              }}
              className={styles.middleCircle}
            />
            <button
              onClick={() => dispatch(increment())}
              className={styles.iconButton}
            >
              <BiSolidRightArrow />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
