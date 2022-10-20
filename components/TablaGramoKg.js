import React,{useState} from 'react'
import {Table,Input} from '@mantine/core';
import styles from '../styles/Inputs.module.css'

const TablaGramoKg = (props) => {
  const [gramoKgProteinas, setGramoKgProteinas] = useState('');
  const [gramoKgLipidos, setGramoKgLipidos] = useState('');
  
  var porcentajeProteinas = isNaN(((((gramoKgProteinas*props.peso)*4)*100)/props.get).toFixed(2)) ? 0 : ((((gramoKgProteinas*props.peso)*4)*100)/props.get).toFixed(2)
  var porcentajeLipidos = isNaN(((((gramoKgLipidos*props.peso)*9)*100)/props.get).toFixed(2)) ? 0 : ((((gramoKgLipidos*props.peso)*9)*100)/props.get).toFixed(2)
  var porcentajeCarbohidratos = porcentajeProteinas==0  ? 0 : Math.abs(((+porcentajeProteinas)+(+porcentajeLipidos))-100)
  var gramoKgCarbohidratos = isNaN(((((((props.get/100)*porcentajeCarbohidratos).toFixed(2))/4).toFixed(2))/props.peso).toFixed(2)) ? 0 : ((((((props.get/100)*porcentajeCarbohidratos).toFixed(2))/4).toFixed(2))/props.peso).toFixed(2)
  
  return (
    <div>
    <Table horizontalSpacing="sm" >
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
                {/* Proteinas % */}
                <td>{porcentajeProteinas}</td>
                {/* kcal */}
                <td>{((gramoKgProteinas*props.peso)*4).toFixed(2)}</td>
                {/* gramo */}
                <td>{(gramoKgProteinas*props.peso).toFixed(2)}</td>
                {/* Obtener g/kg */}
                <td><Input value={gramoKgProteinas} className={styles.inputs} onChange={(e)=> setGramoKgProteinas(e.currentTarget.value)}></Input></td>
            </tr>
            <tr>
                <td>Lipidos</td>
                {/* Lipidos % */}
                <td>{porcentajeLipidos}</td>
                {/* kcal */}
                <td>{((gramoKgLipidos*props.peso)*9).toFixed(2)}</td>
                {/* gramo */}
                <td>{(gramoKgLipidos*props.peso).toFixed(2)}</td>
                {/* Obtener g/kg */}
                <td><Input value={gramoKgLipidos} className={styles.inputs} onChange={(e)=> setGramoKgLipidos(e.currentTarget.value)}></Input></td>
            </tr>
            <tr>
                <td>Carbohidratos</td>
                {/* Porcentaje % */}
                <td>{porcentajeCarbohidratos.toFixed(2)}</td>
                {/* kcal */}
                <td>{((props.get/100)*porcentajeCarbohidratos).toFixed(2)}</td>
                {/* gramo */}
                <td>{((((props.get/100)*porcentajeCarbohidratos).toFixed(2))/4).toFixed(2)}</td>
                {/* g/kg */}
                <td>{gramoKgCarbohidratos}</td>
            </tr>
            <tr>
                <td>Total</td>
                <td>{((+porcentajeProteinas)+(+porcentajeLipidos)+(+porcentajeCarbohidratos))}</td>
                <td>{props.get}</td>
            </tr>

        </tbody>
    </Table>
    </div>
  )
}

export default TablaGramoKg