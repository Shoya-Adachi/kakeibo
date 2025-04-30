import { Box, Button, Typography } from "@mui/material";
import TextForm from "../../components/textform/TextForm";
import Layout from "../../Layout";
import TextFormToolTip from "../../components/textform/TextFormToolTip";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";
import { CreateKakeiboApi } from "../../api/KakeiboApi";

type IncomeData = {
  salary: number;
  salary2: number;
  totalIncome: number;
};

type expendituresData = {
  food: number;
  life: number;
  medical: number;
  entertainment: number;
  amusement: number;
  etc: number;
  totalExpenses: number;
};

type dateData = {
  date: Date | null;
};

export type submitData = IncomeData & expendituresData & dateData;

const KakeiboInputScreen = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [income, setIncome] = useState<IncomeData>({
    salary: 0,
    salary2: 0,
    totalIncome: 0,
  });

  const [expenditures, setExpenditures] = useState<expendituresData>({
    food: 0,
    life: 0,
    medical: 0,
    entertainment: 0,
    amusement: 0,
    etc: 0,
    totalExpenses: 0,
  });

  const handleIncomeChange =
    (field: keyof IncomeData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value); // 文字列→数値に変換
      const updatedIncome = {
        ...income,
        [field]: value,
      };
      updatedIncome.totalIncome = updatedIncome.salary + updatedIncome.salary2;
      setIncome(updatedIncome);
    };

  const handleExpensesChange =
    (field: keyof expendituresData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value); // 文字列→数値に変換
      const updatedExpenses = {
        ...expenditures,
        [field]: value,
      };
      updatedExpenses.totalExpenses =
        updatedExpenses.food +
        updatedExpenses.medical +
        updatedExpenses.medical +
        updatedExpenses.amusement +
        updatedExpenses.entertainment +
        updatedExpenses.etc;
      setExpenditures(updatedExpenses);
    };

  const clickHandler = async () => {
    const submitData: submitData = { date, ...income, ...expenditures };
    try {
      const response = await CreateKakeiboApi(submitData);

      console.log(response);
    } catch (error) {
      console.log("登録失敗");
    }
  };

  return (
    <Layout title="家計簿入力">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 10,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <DatePicker
              value={date}
              onChange={(newDate) => {
                setDate(newDate);
              }}
              format="yyyy/MM/dd"
              slotProps={{
                textField: {
                  label: "日付",
                  required: true,
                  variant: "standard",
                },
              }}
            />
          </Box>
          <Box>
            <Typography
              variant="h3"
              sx={{ color: "primary.main", marginTop: 5, textAlign: "left" }}
            >
              - 収入 -
            </Typography>
            <Box sx={{ display: "flex", gap: "50px" }}>
              <TextForm
                label="給料"
                value={income?.salary.toString()}
                changeHandler={handleIncomeChange("salary")}
              />
              <TextFormToolTip
                label="臨時収入"
                text="お祝い金など"
                value={income?.salary2.toString()}
                changeHandler={handleIncomeChange("salary2")}
              >
                <ContactSupportIcon />
              </TextFormToolTip>
              <TextForm
                label="収入合計"
                value={income?.totalIncome.toString()}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Typography
              variant="h3"
              sx={{ color: "primary.main", marginTop: 5, textAlign: "left" }}
            >
              - 支出 -
            </Typography>
            <Box sx={{ display: "flex", gap: "50px" }}>
              <TextForm
                label="食費"
                value={expenditures?.food.toString()}
                changeHandler={handleExpensesChange("food")}
              />
              <TextForm
                label="日用品費"
                value={expenditures?.life.toString()}
                changeHandler={handleExpensesChange("life")}
              />
              <TextForm
                label="医療費"
                value={expenditures?.medical.toString()}
                changeHandler={handleExpensesChange("medical")}
              />
            </Box>
            <Box sx={{ display: "flex", gap: "50px" }}>
              <TextFormToolTip
                label="交際費"
                text="飲み会やお仕事関係の出費"
                value={expenditures?.entertainment.toString()}
                changeHandler={handleExpensesChange("entertainment")}
              >
                <ContactSupportIcon />
              </TextFormToolTip>
              <TextFormToolTip
                label="教養娯楽費"
                text="書籍・新聞・雑誌の購入費、美術館や映画館の入場料、旅行やスポーツ観戦、趣味の習い事など"
                value={expenditures?.amusement.toString()}
                changeHandler={handleExpensesChange("amusement")}
              >
                <ContactSupportIcon />
              </TextFormToolTip>
              <TextFormToolTip
                label="その他"
                text="どれにも当てはまらないものがあればここで"
                value={expenditures?.etc.toString()}
                changeHandler={handleExpensesChange("etc")}
              >
                <ContactSupportIcon />
              </TextFormToolTip>
              <TextForm
                label="支出合計"
                value={expenditures?.totalExpenses.toString()}
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={{ width: "150px" }}
            onClick={clickHandler}
          >
            登録
          </Button>
        </Box>
      </LocalizationProvider>
    </Layout>
  );
};

export default KakeiboInputScreen;
