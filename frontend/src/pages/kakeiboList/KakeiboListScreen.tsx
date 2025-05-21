import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/table/DataTable";
import Layout from "../../Layout";
import { deleteKakeibo, fetchKakeibo } from "../../api/KakeiboApi";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const KakeiboListScreen = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["kakeibo"],
    queryFn: fetchKakeibo, // 非同期関数（Promise）
  });

  const deleteAction = async (id: any) => {
    try {
      const response = await deleteKakeibo(id);
      if (response.status === 204) {
        refetch();
      }
    } catch (error) {
      console.error;
    }
  };

  const renderRowActions = (row: any) => {
    return (
      <Box>
        <IconButton onClick={() => console.info("Show")} color={"info"}>
          <VisibilityIcon />
        </IconButton>
        <IconButton onClick={() => console.info("Edit")} color={"secondary"}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => deleteAction(row.id)} color={"error"}>
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  };

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "date",
      header: "日付",
    },
    {
      accessorKey: "total_income",
      header: "収入合計",
    },
    {
      accessorKey: "total_expenditures",
      header: "支出合計",
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred</p>;

  return (
    <Layout title="家計簿一覧">
      <DataTable
        columns={columns}
        data={data}
        enableRowSelection={false}
        enableRowActions={true}
        hiddenColumnKeys={["id"]}
        renderRowActions={renderRowActions}
      />
    </Layout>
  );
};

export default KakeiboListScreen;
