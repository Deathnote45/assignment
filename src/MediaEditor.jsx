import { useState, useEffect } from "react";
import { Button, TextInput, Paper, Container, Title, Card } from "@mantine/core";

export default function MediaEditor() {
  const [file, setFile] = useState(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(10);
  const [timer, setTimer] = useState(0);
  const [playing, setPlaying] = useState(false);

  const handleFileChange = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
  };

  useEffect(() => {
    if (playing) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev >= endTime) {
            clearInterval(interval);
            setPlaying(false);
            return endTime;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [playing, endTime]);

  return (
    <Container size="md" style={{ padding: "20px" }}>
      <Title align="center" order={1} style={{ marginBottom: "20px" }}>
        🎥 Media Editor
      </Title>

      <Paper shadow="xl" p="lg" radius="md" style={{ background: "#2a2a40" }}>
        <TextInput label="Choose File" type="file" onChange={handleFileChange} />
        <TextInput label="Width" value={width} onChange={(e) => setWidth(e.target.value)} />
        <TextInput label="Height" value={height} onChange={(e) => setHeight(e.target.value)} />
        <TextInput label="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <TextInput label="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <Button fullWidth color="blue" mt="md" onClick={() => setPlaying(true)}>▶ Play</Button>
      </Paper>

      <Card shadow="xl" radius="md" mt="lg" style={{ background: "#222", padding: "20px" }}>
        <p style={{ textAlign: "center" }}>⏳ Timer: {timer}s</p>
        {file && timer >= startTime && timer <= endTime && (
          <img src={file} alt="Uploaded Media" width={width} height={height} style={{ borderRadius: "10px", display: "block", margin: "auto" }} />
        )}
      </Card>
    </Container>
  );
}