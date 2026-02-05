import { useState, useEffect } from "react";

function ListeTaches() {
  // ✅ Chargement initial depuis localStorage (évite d’écraser avec [])
  const [taches, setTaches] = useState(() => {
    const tachesSauvegardees = localStorage.getItem("taches");
    return tachesSauvegardees ? JSON.parse(tachesSauvegardees) : [];
  });

  const [texte, setTexte] = useState("");
  const [filtre, setFiltre] = useState("toutes"); // "toutes" | "afaire" | "terminees"


  const ajouterTache = () => {
    if (texte.trim() === "") return;
    setTaches([...taches, { id: Date.now(), texte, terminee: false }]);
    setTexte("");
  };

  const basculerTache = (id) => {
    setTaches(
      taches.map((tache) =>
        tache.id === id ? { ...tache, terminee: !tache.terminee } : tache
      )
    );
  };

  const supprimerTache = (id) => {
    setTaches(taches.filter((tache) => tache.id !== id));
  };

  const tachesFiltrees = taches.filter((tache) => {
    if (filtre === "afaire") return !tache.terminee;
    if (filtre === "terminees") return tache.terminee;
    return true; // toutes
  });


  // ✅ Sauvegarde automatique à chaque changement
  useEffect(() => {
    localStorage.setItem("taches", JSON.stringify(taches));
  }, [taches]);

  return (
    <div>
      <div className="inputRow">
        <input
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          placeholder="Ajouter une tâche"
        />
        <button className="btnAdd" onClick={ajouterTache}>Ajouter</button>
      </div>
      <div className="filters">
        <button
          className={`filterBtn ${filtre === "toutes" ? "active" : ""}`}
          onClick={() => setFiltre("toutes")}
        >
          Toutes
        </button>
        <button
          className={`filterBtn ${filtre === "afaire" ? "active" : ""}`}
          onClick={() => setFiltre("afaire")}
        >
          À faire
        </button>
        <button
          className={`filterBtn ${filtre === "terminees" ? "active" : ""}`}
          onClick={() => setFiltre("terminees")}
        >
          Terminées
        </button>
      </div>

      <ul>
        {tachesFiltrees.map((tache) => (
          <li key={tache.id}>
            <span
              className={`taskText ${tache.terminee ? "taskDone" : ""}`}
              onClick={() => basculerTache(tache.id)}
            >
              {tache.texte}
            </span>
            <button className="btnDelete" onClick={() => supprimerTache(tache.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListeTaches;
