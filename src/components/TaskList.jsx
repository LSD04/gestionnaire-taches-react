import { useState, useEffect } from "react";

function ListeTaches() {
  // ✅ Chargement initial depuis localStorage (évite d’écraser avec [])
  const [taches, setTaches] = useState(() => {
    const tachesSauvegardees = localStorage.getItem("taches");
    return tachesSauvegardees ? JSON.parse(tachesSauvegardees) : [];
  });

  const [texte, setTexte] = useState("");

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

  // ✅ Sauvegarde automatique à chaque changement
  useEffect(() => {
    localStorage.setItem("taches", JSON.stringify(taches));
  }, [taches]);

  return (
    <div>
      <input
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
        placeholder="Ajouter une tâche"
      />
      <button onClick={ajouterTache}>Ajouter</button>

      <ul>
        {taches.map((tache) => (
          <li key={tache.id}>
            <span
              onClick={() => basculerTache(tache.id)}
              style={{
                textDecoration: tache.terminee ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {tache.texte}
            </span>
            <button onClick={() => supprimerTache(tache.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListeTaches;
