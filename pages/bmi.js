import { React, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/Bmi.module.css";
import { TextInput, Stack, Button, Text, useForm } from "@mantine/core";
import { IconHome2, IconCheckupList, IconCalculator } from "@tabler/icons";
import Link from "next/link";

const Bmi = () => {
  //const [peso, setPeso] = useState('')
  //const [estatura, setEstatura] = useState('')
  const [estatura, setEstatura] = useState("");
  const [peso, setPeso] = useState("");

  const resultado = calcula(estatura, peso);

  return (
    <Layout tituloPagina="BMI">
      <div className={styles.main}>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            setEstatura(ev.target.estatura.value);
            setPeso(ev.target.peso.value);
            calcula(estatura, peso);
          }}
        >
          <Stack className={styles.stack} align="center">
            <TextInput
              label="Estatura"
              placeholder="Estatura en metros"
              name="estatura"
            />
            <TextInput placeholder="Peso en kg" label="Peso" name="peso" />
            <Button type="submit" radius="md" color="dark">
              Calcular
            </Button>
          </Stack>
        </form>
      </div>

      <h1 className={styles.texto}>{resultado}</h1>
    </Layout>
  );
};

const calcula = (estatura, peso) => {
  var bmi = peso / (estatura * estatura);

  if (bmi < 18.5) {
    return "BMI: " + bmi.toFixed(2) + " - Peso bajo";
  }
  if (bmi > 18.5 && bmi < 24.9) {
    return "BMI: " + bmi.toFixed(2) + " - Peso normal";
  }
  if (bmi > 25 && bmi < 29.9) {
    return "BMI: " + bmi.toFixed(2) + " - Sobrepeso";
  }
  if (bmi > 30 && bmi < 34.9) {
    return "BMI: " + bmi.toFixed(2) + " - Obesidad grado 1";
  }
  if (bmi > 35 && bmi < 39.9) {
    return "BMI: " + bmi.toFixed(2) + " - Obesidad grado 2";
  } else if (bmi > 40) {
    return "BMI: " + bmi.toFixed(2) + " - Boomer ";
  }

  /* var estatura = document.getElementById("estatura").value
  var peso = document.getElementById("peso").value
  var bmi = 


  
  if (bmi > 18.5 && bmi < 24.9 ){
    document.getElementById("resultado").innerHTML = ("Peso normal" + "\n" + bmi.toFixed(2))
  }
  if(bmi > 25 && bmi < 29.9){
    document.getElementById("resultado").innerHTML = ("Sobrepeso" + "\n" + bmi.toFixed(2))
  }
  if(bmi > 30 && bmi < 34.9){
    document.getElementById("resultado").innerHTML = ("Obesidad" + "\n" + bmi.toFixed(2))
  }
  if(bmi > 35 && bmi < 39.9){
    document.getElementById("resultado").innerHTML = ("Obesidad grado 2" + "\n" + bmi.toFixed(2))
  }
  else if(bmi > 40){
    document.getElementById("resultado").innerHTML = ("Boomer" + "\n" + bmi.toFixed(2))
  } */
};

export default Bmi;
