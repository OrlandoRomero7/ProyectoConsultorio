import React,{useState}from 'react'
import {Table,Input,NumberInput, Button} from '@mantine/core';
import { IconCurrentLocation } from '@tabler/icons';

const TablaPorcentaje = (props) => {
  const [porcentajeProteinas, setPorcentajeProteinas] = useState(0)
  const [porcentajeLipidos, setPorcentajeLipidos] = useState(0)
  const [porcentajeCarbohidratos, setPorcentajeCarbohidratos] = useState(0)
  const gramoKgProteinas = isNaN((((props.data/100)*(porcentajeProteinas)/4)/props.data2).toFixed(2)) ? 0 : (((props.data/100)*(porcentajeProteinas)/4)/props.data2).toFixed(2)
  const gramoKgLipidos = isNaN((((props.data/100)*(porcentajeLipidos)/9)/props.data2).toFixed(2)) ? 0 : (((props.data/100)*(porcentajeLipidos)/9)/props.data2).toFixed(2)
  const gramoKgCarbohidratos = isNaN((((props.data/100)*(porcentajeCarbohidratos)/4)/props.data2).toFixed(2)) ? 0 : (((props.data/100)*(porcentajeCarbohidratos)/4)/props.data2).toFixed(2)


  
  return (
    <div>
      <Table >
        <thead>
          <tr>
            <th></th>
            <th>Porcentaje</th>
            <th>Kcal</th>
            <th>gramo</th>
            <th>g/kg</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>Proteinas</td>
                {/* Obtener Proteinas % */}
                <td><Input value={porcentajeProteinas} onChange={(event) => 
                  {setPorcentajeProteinas(event.currentTarget.value)
    
                  }}></Input></td>
                {/* kcal % */}
                <td>{((props.data/100)*(porcentajeProteinas)).toFixed(2)}</td>
                {/* gramo % */}
                <td>{((props.data/100)*(porcentajeProteinas)/4).toFixed(2)}</td>
                {/* gramoKg % */}
                <td>{gramoKgProteinas}</td>
            </tr>
            <tr>
                <td>Lipidos</td>
                {/* Obtener Lipidos % */}
                <td><Input value={porcentajeLipidos} onChange={(event) => 
                  {setPorcentajeLipidos(event.currentTarget.value)  
   
                  }}></Input></td>
                  {/* kcal */}
                <td>{((props.data/100)*(porcentajeLipidos)).toFixed(2)}</td>
                {/*  gramo  */}
                <td>{((props.data/100)*(porcentajeLipidos)/9).toFixed(2)}</td>
                {/* gramoKg*/}
                <td>{gramoKgLipidos}</td>
            </tr>
            <tr>
                <td>Carbohidratos</td>
                {/* Obtener Carbohidratos % */}
                <td><Input value={porcentajeCarbohidratos} onChange={(event) => 
                  {setPorcentajeCarbohidratos(event.currentTarget.value)  
   
                  }}></Input></td>
                  {/* kcal */}
                <td>{((props.data/100)*(porcentajeCarbohidratos)).toFixed(2)}</td>
                {/* gramo */}
                <td>{((props.data/100)*(porcentajeCarbohidratos)/4).toFixed(2)}</td>
                {/* gramoKg */}
                <td>{gramoKgCarbohidratos}</td>
            </tr>
            <tr>
                <td>Total</td>
                {/* Porcentaje Total */}
                <td>{(+porcentajeProteinas)+(+porcentajeLipidos)+(+porcentajeCarbohidratos)}</td>
                {/* kcal totales */}
                <td>{props.data}</td>
            </tr>
            <tr>
              <td></td>
            </tr>

        </tbody>
        
    </Table>
    {/* <Button onClick={calcular}>Calcular</Button> */}

    </div>
    
    
    
  )
}


export default TablaPorcentaje