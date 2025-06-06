import { Box, Button, Snackbar, Typography } from "@mui/material";
import TextForm from "../../components/textform/TextForm";
import Layout from "../../Layout";
import TextFormToolTip from "../../components/textform/TextFormToolTip";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";
import { kakeiboInputFormatter } from "../../utils/ApiFormatter";
import { CreateKakeiboApi } from "../../api/KakeiboApi";
import { ConfirmationDialog } from "../../components/dialog/AppDialog";

type KakeiboData = {
  name: string;
  amount: number;
};

const KakeiboInputScreen = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  const initialIncome: KakeiboData[] = [
    { name: "salary", amount: 0 },
    { name: "salary2", amount: 0 },
  ];

  const initialExpenses: KakeiboData[] = [
    { name: "food", amount: 0 },
    { name: "life", amount: 0 },
    { name: "medical", amount: 0 },
    { name: "entertaiment", amount: 0 },
    { name: "amusement", amount: 0 },
    { name: "etc", amount: 0 },
  ];

  const [income, setIncome] = useState<KakeiboData[]>(initialIncome);
  const [expenses, setExpenses] = useState<KakeiboData[]>(initialExpenses);
  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  //収入・出費合計計算
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);

  //各収入項目表示処理
  const handleIncomeChange = (index: number, value: string) => {
    const updatedIncomes = [...income];
    updatedIncomes[index].amount = parseFloat(value) || 0;
    setIncome(updatedIncomes);
  };

  //各出費項目表示処理
  const handleExpensesChange = (index: number, value: string) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index].amount = parseFloat(value) || 0;
    setExpenses(updatedExpenses);
  };

  const openDialog = () => {
    setOpen(true);
  };

  // 登録ボタンクリック時の処理
  const clickHandler = async () => {
    const submitData = kakeiboInputFormatter([date, ...income, ...expenses]);
    try {
      const response = await CreateKakeiboApi(submitData);

      if (response.status == "success") {
        setOpen(false);
        setIncome(initialIncome);
        setExpenses(initialExpenses);
        setDate(new Date());
        setOpenSnackBar(true);
      }
    } catch (error) {
      console.log("登録失敗");
    }
  };

  const snackBarAction = (
    <Button
      color="secondary"
      size="small"
      onClick={() => setOpenSnackBar(false)}
    >
      X
    </Button>
  );

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
              sx={{ color: "secondary.main", marginTop: 5, textAlign: "left" }}
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
              sx={{ color: "secondary.main", marginTop: 5, textAlign: "left" }}
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
            color="secondary"
            sx={{ width: "150px" }}
            onClick={openDialog}
          >
            登録
          </Button>
        </Box>
      </LocalizationProvider>
      <ConfirmationDialog
        open={open}
        setOpen={setOpen}
        agreeFunction={clickHandler}
        title="登録確認"
        text="登録してもよろしいですか？"
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnackBar}
        message="正常に登録されました。"
        action={snackBarAction}
      />
    </Layout>
  );
};

export default KakeiboInputScreen;
