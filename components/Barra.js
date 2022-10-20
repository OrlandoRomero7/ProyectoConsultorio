import {React, useState} from 'react'
import { IconHome2,IconCheckupList,IconCalculator, IconSearch } from '@tabler/icons';
//import { TextInput,Group,Button,Stack,Navbar, AppShell } from '@mantine/core';
import { AppShell,Navbar, Header,Footer,Image, MediaQuery, Burger,useMantineTheme,NavLink
} from '@mantine/core';
import styles from '../styles/Barra.module.css'
import Link from 'next/link';

const Barra = ({children}) => {
    const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
    styles={{
      main: {
        background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      },
    }}
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar className={styles.barraNavegacion} p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 200, base: 300 }}>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>
          
          <Link href="/inicio" passHref><NavLink component="a" className={styles.navs} label="Home" icon={<IconHome2 size={16} stroke={1.5} />}/></Link>
          {/* <NavLink href='/' icon={<IconHome2 size={16} stroke={1.5} />}>Inicio</NavLink> */}
          <Link href="/bmi" passHref>
            <NavLink component="a" label="BMI" className={styles.navs} icon={<IconCheckupList size={16} stroke={1.5} />}/>
          </Link>
          {/* <Link href='/bmi'>BMI</Link> */}
          <Link href="/calculo" passHref>
            <NavLink component="a" label="Calculos" className={styles.navs} icon={<IconCalculator size={16} stroke={1.5} />}/>
          </Link>
          {/* <Link href='/calculo'>Calculo</Link> */}
          <Link href="/buscador" passHref>
            <NavLink component="a" className={styles.navs} icon={<IconSearch size={16} stroke={1.5} />} label="Alimentos"   />
          </Link>
        </Navbar>
      }
      
      
      header={
        <Header  height={70} p="xl" >
          <div className={styles.header} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Image  className={styles.logo} width={200} height={60} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-1sPSFU3xWT6RTcxwS9FFsoAPhWHrwSVo6MKrwwxDSay37pm5tWzRzmWNI7_pFlmwCfE&usqp=CAU'></Image>
            {/* <div className={styles.search}>
              <TextInput className={styles.searchInput}></TextInput>
              <ActionIcon className={styles.searchIcon}><IconSearch variant="light" color="cyan" size={34} /></ActionIcon>
            </div> */}
          </div>
        </Header>
      }
      
      /* header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            

            <h1>Consultorio</h1>
          </div>
        </Header>
      }   */
    >
    
    
    {children}
      
      
    </AppShell>
  )
}

export default Barra