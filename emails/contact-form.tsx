import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

export interface ContactFormEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactFormEmail: React.FC<ContactFormEmailProps> = ({
  name,
  email,
  subject,
  message,
}) => {
  const previewText = `Nuevo mensaje de ${name}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-10 max-w-2xl rounded-lg bg-white p-8 shadow-lg">
            <Heading className="mb-6 border-b pb-4 text-2xl font-bold text-gray-800">
              Consulta de Algo Para Contar
            </Heading>
            <Section>
              <Text className="mb-4 text-base font-medium text-gray-700">
                Has recibido un nuevo mensaje de contacto con los siguientes detalles:
              </Text>
              <Container className="mb-6 rounded-lg bg-gray-50 p-6">
                <Text className="mb-2">
                  <span className="font-bold text-gray-800">Nombre:</span>{" "}
                  <span className="text-gray-700">{name}</span>
                </Text>
                <Text className="mb-2">
                  <span className="font-bold text-gray-800">Email:</span>{" "}
                  <span className="text-blue-600">{email}</span>
                </Text>
                <Text className="mb-2">
                  <span className="font-bold text-gray-800">Asunto:</span>{" "}
                  <span className="text-gray-700">{subject}</span>
                </Text>
                <Hr className="my-4 border-gray-300" />
                <Text className="font-bold text-gray-800">Mensaje:</Text>
                <Text className="mt-2 text-gray-700">{message}</Text>
              </Container>
            </Section>
            <Hr className="my-6 border-gray-300" />
            <Text className="text-sm text-gray-600">
              Este es un mensaje automático. Por favor, no respondas directamente a este email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactFormEmail;