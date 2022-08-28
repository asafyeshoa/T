import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CharCard(props) {
  const { row } = props;
  const [imageSrc, setImageSrc] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
  );

  useEffect(() => {
    async function getImage() {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character/${row.id}`
      );

      setImageSrc(res.data.image);
    }
    getImage();
  }, [row.id]);

  return (
    <Card style={{ marginBottom: "5px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100%"
          image={imageSrc}
          alt="char-mob"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {row.name}
          </Typography>
          <Typography>
            Origin: {row.origin.name} <br />
            Dimension: Dimension C-137 <br />
            Poplurity: {row.episode.length} <br />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
