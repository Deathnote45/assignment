import { useState } from "react";
import {
  Container,
  Paper,
  Title,
  Text,
  Group,
  SegmentedControl,
  ColorInput,
  Textarea,
  Button,
  CopyButton,
  Flex,
} from "@mantine/core";
import { IconPalette, IconClipboard } from "@tabler/icons-react";

// Predefined color options
const colors = {
  red: "#FF5733",
  blue: "#3498DB",
  green: "#2ECC71",
  yellow: "#F1C40F",
  purple: "#9B59B6",
  white: "#FFFFFF",
  black: "#000000",
};

export default function DiscordTextGenerator() {
  const [text, setText] = useState("");
  const [fgColor, setFgColor] = useState(colors.white);
  const [bgColor, setBgColor] = useState(colors.black);
  const [isBold, setIsBold] = useState(false);

  const generateCodeBlock = () => {
    let formattedText = text;
    if (isBold) formattedText = `**${formattedText}**`;
    return `\`\`\`ansi\n[38;2;${fgColor}m[48;2;${bgColor}m${formattedText}[0m\n\`\`\``;
  };

  return (
    <Container
      size="lg"
      style={{
        minHeight: "100vh",
        backgroundColor: "#181818",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        shadow="xl"
        p="xl"
        radius="md"
        withBorder
        style={{ maxWidth: 700, width: "100%", backgroundColor: "#252525" }}
      >
        {/* Header */}
        <Flex direction="column" align="center" mb="lg">
          <IconPalette size={36} color="white" />
          <Title order={2} color="white">
            Discord Colored Text Generator
          </Title>
          <Text color="gray">Select colors and format your text for Discord!</Text>
        </Flex>

        {/* Color Picker Row */}
        <Group position="apart" mb="md">
          <ColorInput
            label="Foreground Color"
            value={fgColor}
            onChange={setFgColor}
            swatches={Object.values(colors)}
          />
          <ColorInput
            label="Background Color"
            value={bgColor}
            onChange={setBgColor}
            swatches={Object.values(colors)}
          />
        </Group>

        {/* Predefined Color Palette */}
        <Text color="gray" mb="xs">
          Quick Colors:
        </Text>
        <SegmentedControl
          fullWidth
          data={Object.keys(colors).map((color) => ({
            label: <div style={{ backgroundColor: colors[color], width: 20, height: 20, borderRadius: "50%" }} />,
            value: colors[color],
          }))}
          onChange={setFgColor}
        />

        {/* Text Input */}
        <Textarea
          label="Enter your text"
          placeholder="Type your message..."
          minRows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          mt="md"
        />

        {/* Formatting Buttons */}
        <Group position="center" mt="md">
          <Button onClick={() => setIsBold(!isBold)} variant={isBold ? "filled" : "outline"}>
            {isBold ? "Unbold" : "Bold"}
          </Button>
          <Button color="red" onClick={() => setText("")}>
            Reset
          </Button>
        </Group>

        {/* Generated Code */}
        <Text color="gray" mt="xl">
          Generated Code:
        </Text>
        <Textarea value={generateCodeBlock()} readOnly minRows={3} mb="md" />

        {/* Copy Button */}
        <Group position="center">
          <CopyButton value={generateCodeBlock()} timeout={2000}>
            {({ copied, copy }) => (
              <Button color={copied ? "green" : "blue"} onClick={copy} leftIcon={<IconClipboard size={18} />}>
                {copied ? "Copied!" : "Copy Code"}
              </Button>
            )}
          </CopyButton>
        </Group>
      </Paper>
    </Container>
  );
}
