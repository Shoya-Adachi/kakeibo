import { Box, Button, Typography } from "@mui/material";
import TextForm from "../../components/textform/TextForm";
import Layout from "../../Layout";
import TextFormToolTip from "../../components/textform/TextFormToolTip";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";
import { kakeiboInputFormatter } from "../../utils/ApiFormatter";
import { CreateKakeiboApi } from "../../api/KakeiboApi";

type KakeiboData = {
  name: string;
  amount: number;
};

type dateData = {
  date: Date | null;
};

export type submitData = KakeiboData & dateData;

const KakeiboInputScreen = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [income, setIncome] = useState<KakeiboData[]>([
    { name: "salary", amount: 0 },
    { name: "salaryw", amount: 0 },
  ]);

  const [expenses, setExpenses] = useState<KakeiboData[]>([
    { name: "food", amount: 0 },
    { name: "life", amount: 0 },
    { name: "medical", amount: 0 },
    { name: "entertaiment", amount: 0 },
    { name: "amusement", amount: 0 },
    { name: "etc", amount: 0 },
  ]);

  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);

  const handleIncomeChange = (index: number, value: string) => {
    const updatedIncomes = [...income];
    updatedIncomes[index].amount = parseFloat(value) || 0;
    setIncome(updatedIncomes);
  };

  const handleExpensesChange = (index: number, value: string) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index].amount = parseFloat(value) || 0;
    setExpenses(updatedExpenses);
  };

  const clickHandler = async () => {
    const submitData = kakeiboInputFormatter([date, ...income, ...expenses]);
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
                value={income[0]?.amount.toString()}
                changeHandler={(e) => handleIncomeChange(0, e.target.value)}
              />
              <TextFormToolTip
                label="臨時収入"
                text="お祝い金など"
                value={income[1]?.amount.toString()}
                changeHandler={(e) => handleIncomeChange(1, e.target.value)}
              >
                <ContactSupportIcon />
              </TextFormToolTip>
              <TextForm label="収入合計" value={totalIncome.toString()} />
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
                value={expenses[0]?.amount.toString()}
                changeHandler={(e) => handleExpensesChange(0, e.target.value)}
              />
              <TextForm
                label="日用品費"
                value={expenses[1]?.amount.toString()}
                changeHandler={(e) => handleExpensesChange(1, e.target.value)}
              />
              <TextForm
                label="医療費"
                value={expenses[2]?.amount.toString()}
                changeHandler={(e) => handleExpensesChange(2, e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", gap: "50px" }}>
              <TextFormToolTip
                label="交際費"
                text="飲み会やお仕事関係の出費"
                value={expenses[3]?.amount.toString()}
                changeHandler={(e) => handleExpensesChange(3, e.target.value)}
              >
                <ContactSupportIcon />
              </TextFormToolTip>
              <TextFormToolTip
                label="教養娯楽費"
                text="書籍・新聞・雑誌の購入費、美術館や映画館の入場料、旅行やスポーツ観戦、趣味の習い事など"
                value={expenses[4]?.amount.toString()}
                changeHandler={(e) => handleExpensesChange(4, e.target.value)}
              >
                <ContactSupportIcon />
              </TextFormToolTip>
              <TextFormToolTip
                label="その他"
                text="どれにも当てはまらないものがあればここで"
                value={expenses[5]?.amount.toString()}
                changeHandler={(e) => handleExpensesChange(5, e.target.value)}
              >
                <ContactSupportIcon />
              </TextFormToolTip>
              <TextForm label="支出合計" value={totalExpenses.toString()} />
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
