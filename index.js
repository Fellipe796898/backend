import express from "express";
import { 
  buscarUfPorId,buscarUfsPorNome,buscarUfs,buscarUfsPorSigla,buscarUfsPorInicial,
} 
from "./serviços/servicos.js";

const app = express();

// Buscar todos ou por nome (via query ?busca=)
app.get("/ufs", (req, res) => {
  const nomeUf = req.query.busca;
  const resultado = nomeUf ? buscarUfsPorNome(nomeUf) : buscarUfs();

  if (resultado.length > 0) {
    res.json(resultado);
  } else {
    res.status(404).send({ erro: "nenhuma uf encontrada" });
  }
});

// Buscar por ID
app.get("/ufs/id/:iduf", (req, res) => {
  const uf = buscarUfPorId(req.params.iduf);

  if (uf) {
    res.json(uf);
  } else if (isNaN(parseInt(req.params.iduf))) {
    res.status(400).send({ erro: "requisição inválida" });
  } else {
    res.status(404).send({ erro: "uf não encontrada" });
  }
});

// Buscar por sigla (ou plataforma no caso dos games)
app.get("/ufs/sigla/:sigla", (req, res) => {
  const resultado = buscarUfsPorSigla(req.params.sigla);

  if (resultado.length > 0) {
    res.json(resultado);
  } else {
    res.status(404).send({ erro: "sigla não encontrada" });
  }
});

// Buscar por inicial do título
app.get("/ufs/inicial/:inicial", (req, res) => {
  const resultado = buscarUfsPorInicial(req.params.inicial);

  if (resultado.length > 0) {
    res.json(resultado);
  } else {
    res.status(404).send({ erro: "nenhum resultado com essa inicial" });
  }
});

app.listen(8080, () => {
  let data = new Date();
  console.log("Servidor iniciado na porta 8080 em: " + data);
});
