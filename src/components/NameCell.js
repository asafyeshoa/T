import TableCell from "@mui/material/TableCell";
import axios from "axios";
import { useState, useEffect } from "react";
export default function NameCell(props) {
  const { id, name } = props;
  const [imageSrc, setImageSrc] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
  );

  useEffect(() => {
    async function getImage() {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );

      setImageSrc(res.data.image);
    }
    getImage();
  }, [id]);

  return (
    <TableCell component="th" scope="row" className="name-cell">
      <img src={imageSrc} height="38" width="38" alt="char" />
      {name}
    </TableCell>
  );
}

