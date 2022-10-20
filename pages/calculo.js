import React, { useState } from 'react'
import { useForm } from '@mantine/form';
import Layout from '../components/Layout'
import {Center,Input,Select,TextInput, Checkbox, Button, Group, Box,Stack, SegmentedControl, Text, SimpleGrid, Tabs, Table, NumberInput, Badge, ScrollArea} from '@mantine/core';
import styles from '../styles/Calculo.module.css'
import { IconPhoto, IconMessageCircle, IconSettings, IconPercentage, IconAmbulance, IconScale, IconCarrot, IconMeat } from '@tabler/icons';

import TablaPorcentaje from '../components/TablaPorcentaje';
import TablaGramoKg from '../components/TablaGramoKg';

const Calculo = () => {

  const form = useForm({
    initialValues:{
      persona: {
        estatura: '',
        peso: '',
        edad: '',
        genero: 'masculino',
        factor: '',
        tipo: ''
      },
      geb: 0,
      fa: '',
      ter: '',
      get: 0,
      text_geb: '',
      text_get:'',
            
    }

  });

  const submit = (values) => {
    const tipo = values.persona.tipo;
    const genero = values.persona.genero;
    const peso = values.persona.peso;
    const estatura = values.persona.estatura;
    const edad = values.persona.edad;
    const factor = values.persona.factor;
    form.values.text_geb = 'GEB'
    form.values.text_get = 'GET'

    if(tipo == "harris"){
      if(genero == "masculino"){
        values.geb = 66.5 + (13.75 * peso) + (5 * (estatura)) - (6.78 * edad)
      } else {
        values.geb = 655.1 + (9.56 * peso) + (1.85 * (estatura)) - (4.68 * edad)
        
      }
    }
    if(tipo == "oms"){
      if(genero == "masculino"){
        values.geb = (11.3 * peso) + (16 * (estatura/100)) + 901
      } else {
        values.geb = (8.7 * peso) - (25 * (estatura/100)) + 865
        
      }
    }
    if(tipo == "owen"){
      if(genero == "masculino"){
        values.geb = 879 + (10.2 * peso)
      } else {
        values.geb = 795 + (7.18 * peso)
        
      }
    }
    if(tipo == "valencia"){
      if(genero == "masculino"){
        if(edad <= 29){
          values.geb = (13.37 * peso) + 747
        } else if(edad <= 59){
          values.geb = (13.08 * peso) + 693
        } else{
          values.geb = (14.21 * peso) + 429
        }
      } else {
        if(edad <= 29){
          values.geb = (11.02 * peso) + 679
          
        } else if(values.persona.edad <= 59){
          values.geb = (10.92 * peso) + 677
          
        } else{
          values.geb = (10.98 * peso) + 520
        }
      }
    }
    if(tipo == "mifflin"){
      if(genero == "masculino"){
        values.geb = (10 * peso) + (6.25 * estatura) - (5 * edad) + 5
      } else {
        values.geb = (10 * peso) + (6.25 * estatura) - (5 * edad) - 161
        
      }
    }

    if(tipo == "harris"){
      if (factor== "sedentario"){
        values.fa = values.geb * 1.2
        values.ter = values.geb * 0.10
        values.get = values.fa + values.ter
      } else if(factor== "ligero"){
        values.fa = values.geb * 1.3
        values.ter = values.geb * 0.10
        values.get = values.fa + values.ter
      } else if(factor== "moderado"){
        values.fa = values.geb * 1.5
        values.ter = values.geb * 0.10
        values.get = values.fa + values.ter
      } else if(factor== "activo"){
        values.fa = values.geb * 1.7
        values.ter = values.geb * 0.10
        values.get = values.fa + values.ter
      } else if(factor== "vigoroso"){
        values.fa = values.geb * 1.9
        values.ter = values.geb * 0.10
        values.get = values.fa + values.ter
      }
    } else {
      if (factor== "sedentario"){
        values.fa = values.geb * 1.2
        values.get = values.fa
      } else if(factor== "ligero"){
        values.fa = values.geb * 1.3
        values.get = values.fa
      } else if(factor== "moderado"){
        values.fa =values.geb * 1.5
        values.get =values.fa
      } else if(factor== "activo"){
        values.fa = values.geb * 1.7
        values.get = values.fa
      } else if(factor== "vigoroso"){
        values.fa = values.geb * 1.9
        values.get = values.fa
      }
    }

  }  
  return (
    <Layout>
       <Tabs color="green" radius="xs" defaultValue="calculo">
        <Center>
        <Tabs.List>
        <Tabs.Tab value="calculo" icon={<IconCarrot size={18} />}>Calculo Dietetico</Tabs.Tab>
        <Tabs.Tab value="porcentaje" icon={<IconMeat size={18} />}>Tabla Porcentaje</Tabs.Tab>
        <Tabs.Tab value="gramokg" icon={<IconScale size={18} />}>Tabla Gramo / Kilogramo</Tabs.Tab>
      </Tabs.List>

        </Center>
      


      <Tabs.Panel value="gramoKg" pt="xs">
        
      </Tabs.Panel>

      <Tabs.Panel value="calculo" pt="xs">
      <div>
      <form onSubmit={form.onSubmit((values) => submit(values))} >
        <Stack className={styles.stack} align="center" >
        <Select
            label="Tipo de Calculo Dietetico"
            placeholder="Seleccione"
            {...form.getInputProps('persona.tipo')}
            data={[
              { value: 'harris', label: 'Harris-Benedict' },
              { value: 'oms', label: 'OMS' },
              { value: 'owen', label: 'Owen' },
              { value: 'valencia', label: 'Valencia' },
              { value: 'mifflin', label: 'Mifflin St-Jeor' },
            ]}
          />
          <TextInput  label="Estatura" placeholder="Estatura cm" {...form.getInputProps('persona.estatura')}/>
          <TextInput placeholder="Peso en kg" label="Peso" {...form.getInputProps('persona.peso')}/>
          <TextInput placeholder="Edad" label="Edad" {...form.getInputProps('persona.edad')}/>
          <Select
            label="Factor de actividad"
            placeholder="Seleccione"
            {...form.getInputProps('persona.factor')}
            data={[
              { value: 'sedentario', label: 'Sedentario' },
              { value: 'ligero', label: 'Ligero' },
              { value: 'moderado', label: 'Moderado' },
              { value: 'activo', label: 'Activo' },
              { value: 'vigoroso', label: 'Vigoroso' },
            ]}
          />
          <SegmentedControl
            {...form.getInputProps('persona.genero')}
            data={[
              { label: 'Masculino', value: 'masculino'},
              { label: 'Femenino', value: 'femenino' }
            ]}
          /> 
          <Button color="green" type='submit' radius="md" >Calculo Dietetico</Button>
          
          <Badge variant="dot" size="xl" color="red">Tu GEB es: {(form.values.geb).toFixed(2)}</Badge>
          <Badge variant="dot" size="xl"color="green">Tu GET es: {(form.values.get).toFixed(2)}</Badge>
        </Stack>
      </form>
      </div>
      </Tabs.Panel>
      
      
          <Tabs.Panel  value="porcentaje" pt="xs" >
          <Stack align="center">
            <TablaPorcentaje data={(form.values.get).toFixed(2)} data2={form.values.persona.peso}></TablaPorcentaje>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="gramokg" pt="xs">
          <Stack  align="center">
            <TablaGramoKg peso={form.values.persona.peso} get={(form.values.get).toFixed(2)}></TablaGramoKg>
            </Stack>
          </Tabs.Panel>

        </Tabs>
        
    </Layout>
    
  )
}

export default Calculo