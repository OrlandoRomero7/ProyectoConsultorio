import React, { useState } from "react";
import {
  Stack,
  Center,
  ActionIcon,
  TextInput,
  Button,
  PasswordInput,
  Group,
  Modal,
  Text,
  Paper
} from "@mantine/core";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import styles from "../styles/Login.module.css";
import { Image } from "@mantine/core";
import { useRef } from "react";
import { useRouter } from "next/router";
import { IconUser, IconLock, IconHelp } from "@tabler/icons";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useForm } from "@mantine/form";

const NuevoRegistro = () => {
  const [mensajeError, setMensajeError] = useState("");

  const form = useForm({
    initialValues: {
      emailRegistrar: "",
      passwordRegistrar: "",
      confirmPasswordRegistrar: "",
    },

    validate: {
      emailRegistrar: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Esto no es un correo",
      passwordRegistrar: (value) =>
        value.length < 6
          ? "La contraseñas deben de tener como minimo 6 caracteres"
          : null,
      confirmPasswordRegistrar: (value) =>
        value.length < 6
          ? "La contraseñas deben de tener como minimo 6 caracteres"
          : null,
      confirmPasswordRegistrar: (value, values) =>
        value !== values.passwordRegistrar
          ? "Las contraseñas no coinciden"
          : null,
    },
  });

  const { push } = useRouter();

  const registerUser = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        form.values.emailRegistrar,
        form.values.passwordRegistrar
      );
      push("/inicio");
    } catch (error) {
      if (
        error == "FirebaseError: Firebase: Error (auth/email-already-in-use)."
      ) {
        setMensajeError("Este usuario ya esta registrado.");
      }
    }
  };
  const autoplay = useRef(Autoplay({ delay: 4000 }));

  const [opened, setOpened] = useState(false);

  return (
    <Center className={styles.center}>
      <div className={styles.loginContainer}>
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
        <Group spacing="xs">
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
                <h2>Crear Cuenta</h2>
                <p>No tienes una cuenta? Crea una, es totalmente gratis</p>
              </div>
              <form
                className={styles.inputs}
                onSubmit={form.onSubmit(registerUser)}
              >
                <TextInput
                  
                  label="Correo electronico"
                  placeholder="ejemplo@gmail.com"
                  icon={<IconUser size={14} />}
                  description="Ingrese su correo electronico"
                  {...form.getInputProps("emailRegistrar")}
                />
                <PasswordInput
                  
                  placeholder=""
                  label="Contraseña"
                  description="Ingrese su contraseña"
                  withAsterisk
                  icon={<IconLock size={16} />}
                  {...form.getInputProps("passwordRegistrar")}
                />
                <PasswordInput
                  
                  placeholder=""
                  label="Confirme su Contraseña"
                  description="Ingrese la contraseña nuevamente"
                  withAsterisk
                  icon={<IconLock size={16} />}
                  {...form.getInputProps("confirmPasswordRegistrar")}
                />
                <br></br>
                {mensajeError != "" && (
                  <Paper>
                    <Text color="red">{mensajeError}</Text>
                  </Paper>
                )}
                <br></br>
                <Button type="submit" color="lime" radius="md">
                  Crear Cuenta
                </Button>
                <div className={styles.register}>
                  <p>Siempre si tenias cuenta?</p>
                  <a href="/" passHref>
                    {" "}
                    Regresame
                  </a>
                </div>
                <br />
              </form>
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

export default NuevoRegistro;
