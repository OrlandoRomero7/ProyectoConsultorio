import React, { useState } from "react";
import {
  TextInput,
  ActionIcon,
  Stack,
  Button,
  PasswordInput,
  Modal,
  Group,
  Center,
  Text,
  Paper,
} from "@mantine/core";
import { IconUser, IconLock, IconHelp } from "@tabler/icons";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";
import { Image } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useForm } from "@mantine/form";

const Login = () => {
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Esto no es un correo",
      password: (value) =>
        value.length < 6
          ? "La contraseñas tienen como minimo 6 caracteres"
          : null,
    },
  });

  const [mensajeError, setMensajeError] = useState("");

  const { push } = useRouter();

  const sesion = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        form.values.email,
        form.values.password
      );
      push("/inicio");
    } catch (error) {
      if (error == "FirebaseError: Firebase: Error (auth/user-not-found).") {
        setMensajeError("Este usuario no esta registrado");
      }
      if (error == "FirebaseError: Firebase: Error (auth/wrong-password).") {
        setMensajeError("Contraseña incorrecta");
      }
    }
  };

  return (
    <Center className={styles.center}>
      <div className={styles.loginContainer}>
        <Group spacing="xs">
          <div className={styles.loginImage}>
            <Carousel
              className={styles.carousel}
              sx={{ maxWidth: 430 }}
              withControls={false}
              withIndicators={false}
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
            >
              <Carousel.Slide>
                <Image src="https://cdn.pixabay.com/photo/2015/02/13/00/43/apples-634572_960_720.jpg"></Image>
              </Carousel.Slide>
              <Carousel.Slide>
                <Image src="https://cdn.pixabay.com/photo/2019/11/14/07/17/smoothie-4625476_960_720.jpg"></Image>
              </Carousel.Slide>
              <Carousel.Slide>
                <Image src="https://cdn.pixabay.com/photo/2017/08/07/07/18/table-2600954_960_720.jpg"></Image>
              </Carousel.Slide>
            </Carousel>
          </div>

          <div className={styles.form}>
            <div className={styles.helpIcon}>
              <ActionIcon color="lime" onClick={() => setOpened(true)}>
                <IconHelp size={25} />
              </ActionIcon>
            </div>

            <Stack
              className={styles.stack}
              align="center"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
                height: 330,
                width: 400,
              })}
            >
              <Image width={250} src="/img/nutrilogo.png"></Image>
              <div className={styles.text}>
                <h2>Iniciar Sesion</h2>
                <p>
                  Consulta informacion nutricional relevante de tu paciente, si
                  no lo cuidas tu, quien?
                </p>
              </div>
              
              <form className={styles.inputs} onSubmit={form.onSubmit(sesion)}>
                <TextInput
                  
                  label="Correo electronico"
                  placeholder="ejemplo@gmail.com"
                  icon={<IconUser size={14} />}
                  description="Ingrese su correo electronico"
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  
                  placeholder=""
                  label="Contraseña"
                  description="Ingrese su contraseña"
                  withAsterisk
                  icon={<IconLock size={16} />}
                  {...form.getInputProps("password")}
                />
                {mensajeError != "" && (
                  <Paper>
                    <Text color="red">{mensajeError}</Text>
                  </Paper>
                )}
                <div className={styles.down}> 
                <Button type="submit" color="lime" radius="md">
                  Iniciar Sesion
                </Button>
                <div className={styles.register}>
                  <p>No estas registrado?</p>
                  <a href="/registrar" passHref>
                    {" "}
                    Crea una cuenta
                  </a>
                </div>
                <a className={styles.recover} href="/ErrorDeServer">
                  Recuperar Contraseña
                </a>
                </div>
              </form>

              <br />
            </Stack>
          </div>

          <Modal
            withinPortal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Nurtialbatros"
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
          >
            <Text>Presentas algun problema al momento de iniciar sesion?</Text>
            <br />
            <Text>Si es asi mandanos un correo a nutrialbatros@ite.edu.mx</Text>
            <Text>
              Si no es asi tambien mandanos un correo a nutrialbatros@ite.edu.mx
            </Text>
            <br />
            <Text>Nos pondremos en contacto a la brevedad</Text>
          </Modal>
        </Group>
      </div>
    </Center>
  );
};

export default Login;
