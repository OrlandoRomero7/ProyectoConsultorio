import { React, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/Calculo.module.css";
import {
  Stack,
  Button,
  SegmentedControl,
  TextInput,
  Table,
  Popover,
  Text,
  Center,
  SimpleGrid,
  Grid,
  ScrollArea,
  Space,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";

const Buscador = ({ data }) => {
  const [buscar, setBuscar] = useState("");
  const [listaAlimento, setListaAlimento] = useState([]);

  
  const busqueda = () => {
    if (buscar != "") {
      const obtener = data.filter((e) =>
        e.Alimento.toString().toLowerCase().includes(buscar.toLowerCase())
      );
      setListaAlimento(obtener);
    }
  };

  return (
    <Layout>
      <Center>
        <TextInput
          icon={<IconSearch />}
          value={buscar}
          onChange={(e) => setBuscar(e.currentTarget.value)}
          placeholder="Busca un alimento"
        ></TextInput>
        <Space w="xl" />
        <Button onClick={busqueda} color="cyan">
          Buscar
        </Button>
      </Center>
      <br></br>
      <Center>
        <ScrollArea style={{ width: 800, height: 500 }}>
          <div>
            <Table striped>
              <thead>
                <tr>
                  <th>Nombre Alimento</th>
                  <th>Cantidad</th>
                  <th>Peso Neto</th>
                  <th>Proteína</th>
                  <th>Lípidos</th>
                  <th>Carbohidratos</th>
                  <th>EnergíaKcal</th>
                  {/* <th>Más Info. Nutricional</th> */}
                </tr>
              </thead>
              <tbody>
                {listaAlimento.map(
                  ({
                    Alimento,
                    Categoría,
                    Cantidad,
                    PesoBrutoG,
                    Proteína,
                    PesoNetoG,
                    Lípidos,
                    Carbohidratos,
                    EnergíaKcal,
                  }) => (
                    <tr key={Alimento}>
                      <td>{Alimento}</td>
                      <td>{Cantidad}</td>
                      <td>{PesoNetoG}g</td>
                      <td>{Proteína}</td>
                      <td>{Lípidos}</td>
                      <td>{Carbohidratos}</td>
                      <td>{EnergíaKcal}</td>

                      {/* <td>
                        <Popover width={200} position="bottom" withArrow shadow="md">
                          <Popover.Target>
                            <Button color="indigo">Ver mas...</Button>
                          </Popover.Target>
                          <Popover.Dropdown>
                            <ul>
                              <li>Categoría: {Categoría}</li>
                              <li>PesoBruto: {PesoBrutoG}g</li>
                              <li>Carbohidratos: {Carbohidratos}</li>
                              <li>EnergíaKcal: {EnergíaKcal}</li>
                            </ul>
                          </Popover.Dropdown>
                        </Popover>  
                      </td> */}
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </div>
        </ScrollArea>
      </Center>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(
    "https://smae-nuevo-default-rtdb.firebaseio.com/SMAE.json"
  );
  const json = await res.json();

  return {
    props: {
      data: json,
    },
  };
};

export default Buscador;
