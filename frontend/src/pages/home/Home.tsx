import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../Layout";
import { useEffect, useState } from "react";
import { GetMonthTotalApi } from "../../api/KakeiboApi";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const day = new Date();
  const y = day.getFullYear();
  const m = day.getMonth() + 1;

  const [total, setTotal] = useState(0);
  const [month, setMonth] = useState(m);
  const [year, setYear] = useState(y);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = `${year}-${month}`;
        const response = await GetMonthTotalApi(formattedDate);
        setTotal(response.total_amount);
      } catch (error) {
        console.error;
      }
    };

    fetchData();
  }, [month, year]);

  const backPreviousMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const goNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <Layout title="HOME">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <IconButton onClick={backPreviousMonth}>
              <ArrowCircleLeftIcon sx={{ fontSize: 50 }} />
            </IconButton>
            <Box>
              <Typography variant="h5" sx={{ color: "primary.contrastText" }}>
                {year}年
              </Typography>
              <Typography variant="h2" sx={{ color: "primary.contrastText" }}>
                {month}月収支
              </Typography>
            </Box>
            <IconButton onClick={goNextMonth}>
              <ArrowCircleRightIcon sx={{ fontSize: 50 }} />
            </IconButton>
          </Box>
          <TextField
            focused
            sx={{
              width: "500px",
              "& .MuiInputBase-root": {
                height: "150px", // ✅ 入力欄（外枠）を拡大
                alignItems: "center", // ✅ 垂直中央寄せ（オプション）
              },
              "& .MuiInputBase-input": {
                fontSize: "3rem", // ✅ テキストが小さすぎないように調整
                color: total < 0 ? "warning.contrastText" : "secondary.main",
                textAlign: "center",
              },
            }}
            slotProps={{
              input: {
                readOnly: true,
                color:
                  total == null ? "info" : total < 0 ? "warning" : "success",
                endAdornment: (
                  <InputAdornment position="end">円</InputAdornment>
                ),
              },
            }}
            value={total}
          />
        </Box>
        <Button
          variant="outlined"
          onClick={() => navigate("/kakeiboList-page")}
          sx={{
            borderColor: "secondary.main",
            color: "secondary.main",
            mt: 3,
          }}
        >
          詳細へ
        </Button>
      </Box>
    </Layout>
  );
};

export default Home;
