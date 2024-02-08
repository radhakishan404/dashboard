import { Box, Card, Container, Grid, useTheme } from "@mui/material";
import { styles } from './Dashboard.styles.jsx';
import { DataBarChart } from "./DataBarChart.jsx";
import DataTable from "./DataTable.jsx";
import React, { useEffect, useState } from "react";
import axios from "axios";

// const data = [
//     { "id": 1, "name": "Radhakishan", "age": 25, "math_score": 80, "english_score": 60, "physics_score": 60 },
//     { "id": 2, "name": "Samantha", "age": 28, "math_score": 75, "english_score": 85, "physics_score": 85 },
//     { "id": 3, "name": "Rahul", "age": 22, "math_score": 90, "english_score": 70, "physics_score": 70 },
//     { "id": 4, "name": "Priyanka", "age": 23, "math_score": 85, "english_score": 78, "physics_score": 78 },
//     { "id": 5, "name": "Amit", "age": 27, "math_score": 92, "english_score": 65, "physics_score": 65 },
//     { "id": 6, "name": "Neha", "age": 24, "math_score": 78, "english_score": 88, "physics_score": 88 },
//     { "id": 7, "name": "Raj", "age": 26, "math_score": 85, "english_score": 75, "physics_score": 75 },
//     { "id": 8, "name": "Shreya", "age": 29, "math_score": 88, "english_score": 72, "physics_score": 72 },
//     { "id": 9, "name": "Vikas", "age": 21, "math_score": 79, "english_score": 90, "physics_score": 90 },
//     { "id": 10, "name": "Ananya", "age": 30, "math_score": 95, "english_score": 68, "physics_score": 68 },
//     { "id": 11, "name": "Ravi", "age": 26, "math_score": 82, "english_score": 80, "physics_score": 80 },
//     { "id": 12, "name": "Aishwarya", "age": 27, "math_score": 89, "english_score": 77, "physics_score": 77 },
//     { "id": 13, "name": "Rahul", "age": 23, "math_score": 93, "english_score": 73, "physics_score": 73 },
//     { "id": 14, "name": "Shikha", "age": 25, "math_score": 76, "english_score": 85, "physics_score": 85 },
//     { "id": 15, "name": "Rohit", "age": 28, "math_score": 91, "english_score": 68, "physics_score": 68 },
//     { "id": 16, "name": "Pooja", "age": 22, "math_score": 87, "english_score": 76, "physics_score": 76 },
//     { "id": 17, "name": "Karan", "age": 29, "math_score": 84, "english_score": 82, "physics_score": 82 },
//     { "id": 18, "name": "Sara", "age": 24, "math_score": 79, "english_score": 89, "physics_score": 89 },
//     { "id": 19, "name": "Vivek", "age": 26, "math_score": 88, "english_score": 71, "physics_score": 71 },
//     { "id": 20, "name": "Neha", "age": 30, "math_score": 94, "english_score": 67, "physics_score": 67 },
//     { "id": 21, "name": "Alok", "age": 23, "math_score": 81, "english_score": 84, "physics_score": 84 },
//     { "id": 22, "name": "Anjali", "age": 28, "math_score": 75, "english_score": 86, "physics_score": 86 },
//     { "id": 23, "name": "Rajat", "age": 25, "math_score": 90, "english_score": 74, "physics_score": 74 },
//     { "id": 24, "name": "Preeti", "age": 27, "math_score": 86, "english_score": 79, "physics_score": 79 },
//     { "id": 25, "name": "Rohan", "age": 22, "math_score": 83, "english_score": 81, "physics_score": 81 },
//     { "id": 26, "name": "Shivani", "age": 29, "math_score": 78, "english_score": 88, "physics_score": 88 },
//     { "id": 27, "name": "Deepak", "age": 24, "math_score": 89, "english_score": 76, "physics_score": 76 },
//     { "id": 28, "name": "Priya", "age": 26, "math_score": 92, "english_score": 63, "physics_score": 63 },
//     { "id": 29, "name": "Ritika", "age": 30, "math_score": 87, "english_score": 72, "physics_score": 72 },
//     { "id": 30, "name": "Abhishek", "age": 21, "math_score": 94, "english_score": 69, "physics_score": 69 },
//     { "id": 31, "name": "Anushka", "age": 28, "math_score": 80, "english_score": 84, "physics_score": 84 },
//     { "id": 32, "name": "Sunny", "age": 23, "math_score": 91, "english_score": 65, "physics_score": 65 },
//     { "id": 33, "name": "Shreya", "age": 27, "math_score": 85, "english_score": 77, "physics_score": 77 },
//     { "id": 34, "name": "Ravi", "age": 25, "math_score": 76, "english_score": 90, "physics_score": 90 },
//     { "id": 35, "name": "Divya", "age": 22, "math_score": 93, "english_score": 71, "physics_score": 71 },
//     { "id": 36, "name": "Rahul", "age": 29, "math_score": 78, "english_score": 86, "physics_score": 86 },
//     { "id": 37, "name": "Kavita", "age": 24, "math_score": 89, "english_score": 74, "physics_score": 74 },
//     { "id": 38, "name": "Ankit", "age": 26, "math_score": 82, "english_score": 79, "physics_score": 79 },
//     { "id": 39, "name": "Sanya", "age": 30, "math_score": 87, "english_score": 68, "physics_score": 68 },
//     { "id": 40, "name": "Kunal", "age": 23, "math_score": 94, "english_score": 76, "physics_score": 76 },
//     { "id": 41, "name": "Shikha", "age": 28, "math_score": 80, "english_score": 85, "physics_score": 85 },
//     { "id": 42, "name": "Vikram", "age": 25, "math_score": 91, "english_score": 69, "physics_score": 69 },
//     { "id": 43, "name": "Simran", "age": 22, "math_score": 85, "english_score": 78, "physics_score": 78 },
//     { "id": 44, "name": "Rahul", "age": 27, "math_score": 76, "english_score": 92, "physics_score": 92 },
//     { "id": 45, "name": "Sneha", "age": 24, "math_score": 93, "english_score": 70, "physics_score": 70 },
//     { "id": 46, "name": "Rohit", "age": 29, "math_score": 88, "english_score": 75, "physics_score": 75 },
//     { "id": 47, "name": "Aarti", "age": 26, "math_score": 84, "english_score": 81, "physics_score": 81 },
//     { "id": 48, "name": "Vijay", "age": 30, "math_score": 79, "english_score": 87, "physics_score": 87 },
//     { "id": 49, "name": "Anamika", "age": 21, "math_score": 95, "english_score": 66, "physics_score": 66 },
//     { "id": 50, "name": "Rajeev", "age": 28, "math_score": 82, "english_score": 79, "physics_score": 79 },
//     { "id": 51, "name": "Shivani", "age": 23, "math_score": 88, "english_score": 73, "physics_score": 73 },
//     { "id": 52, "name": "Rahul", "age": 27, "math_score": 77, "english_score": 90, "physics_score": 90 },
//     { "id": 53, "name": "Mukesh", "age": 25, "math_score": 94, "english_score": 68, "physics_score": 68 },
//     { "id": 54, "name": "Aarushi", "age": 29, "math_score": 81, "english_score": 85, "physics_score": 85 },
//     { "id": 55, "name": "Vikrant", "age": 24, "math_score": 90, "english_score": 72, "physics_score": 72 },
//     { "id": 56, "name": "Neha", "age": 26, "math_score": 87, "english_score": 76, "physics_score": 76 },
//     { "id": 57, "name": "Ravi", "age": 22, "math_score": 76, "english_score": 92, "physics_score": 92 },
//     { "id": 58, "name": "Aishwarya", "age": 30, "math_score": 91, "english_score": 65, "physics_score": 65 },
//     { "id": 59, "name": "Rahul", "age": 23, "math_score": 84, "english_score": 80, "physics_score": 80 },
//     { "id": 60, "name": "Shreya", "age": 27, "math_score": 79, "english_score": 89, "physics_score": 89 },
//     { "id": 61, "name": "Rohit", "age": 24, "math_score": 92, "english_score": 68, "physics_score": 68 },
//     { "id": 62, "name": "Pooja", "age": 28, "math_score": 86, "english_score": 77, "physics_score": 77 },
//     { "id": 63, "name": "Karan", "age": 25, "math_score": 83, "english_score": 81, "physics_score": 81 },
//     { "id": 64, "name": "Sara", "age": 29, "math_score": 78, "english_score": 88, "physics_score": 88 },
//     { "id": 65, "name": "Vivek", "age": 22, "math_score": 89, "english_score": 71, "physics_score": 71 },
//     { "id": 66, "name": "Neha", "age": 30, "math_score": 94, "english_score": 67, "physics_score": 67 },
//     { "id": 67, "name": "Alok", "age": 23, "math_score": 81, "english_score": 84, "physics_score": 84 },
//     { "id": 68, "name": "Anjali", "age": 28, "math_score": 75, "english_score": 86, "physics_score": 86 },
//     { "id": 69, "name": "Rajat", "age": 25, "math_score": 90, "english_score": 74, "physics_score": 74 },
//     { "id": 70, "name": "Preeti", "age": 27, "math_score": 86, "english_score": 79, "physics_score": 79 },
//     { "id": 71, "name": "Rohan", "age": 22, "math_score": 83, "english_score": 81, "physics_score": 81 },
//     { "id": 72, "name": "Shivani", "age": 29, "math_score": 78, "english_score": 88, "physics_score": 88 },
//     { "id": 73, "name": "Deepak", "age": 24, "math_score": 89, "english_score": 76, "physics_score": 76 },
//     { "id": 74, "name": "Priya", "age": 26, "math_score": 92, "english_score": 63, "physics_score": 63 },
//     { "id": 75, "name": "Ritika", "age": 30, "math_score": 87, "english_score": 72, "physics_score": 72 },
//     { "id": 76, "name": "Abhishek", "age": 21, "math_score": 94, "english_score": 69, "physics_score": 69 },
//     { "id": 77, "name": "Anushka", "age": 28, "math_score": 80, "english_score": 84, "physics_score": 84 },
//     { "id": 78, "name": "Sunny", "age": 23, "math_score": 91, "english_score": 65, "physics_score": 65 },
//     { "id": 79, "name": "Shreya", "age": 27, "math_score": 85, "english_score": 77, "physics_score": 77 },
//     { "id": 80, "name": "Ravi", "age": 25, "math_score": 76, "english_score": 90, "physics_score": 90 },
//     { "id": 81, "name": "Divya", "age": 22, "math_score": 93, "english_score": 71, "physics_score": 71 },
//     { "id": 82, "name": "Rahul", "age": 29, "math_score": 78, "english_score": 86, "physics_score": 86 },
//     { "id": 83, "name": "Kavita", "age": 24, "math_score": 89, "english_score": 74, "physics_score": 74 },
//     { "id": 84, "name": "Ankit", "age": 26, "math_score": 82, "english_score": 79, "physics_score": 79 },
//     { "id": 85, "name": "Sanya", "age": 30, "math_score": 87, "english_score": 68, "physics_score": 68 },
//     { "id": 86, "name": "Kunal", "age": 23, "math_score": 94, "english_score": 76, "physics_score": 76 },
//     { "id": 87, "name": "Shikha", "age": 28, "math_score": 80, "english_score": 85, "physics_score": 85 },
//     { "id": 88, "name": "Vikram", "age": 25, "math_score": 91, "english_score": 69, "physics_score": 69 }
// ]

export const Dashboard = () => {
    const muiTheme = useTheme();
    const style = styles({ muiTheme });

    const [isLoading, setIsLoading] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [datalength, setDatalength] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/users?page=${page}&keyword=${keyword}&rowsPerPage=${rowsPerPage}`);
            setData(response.data.users);
            setDatalength(response.data.totalUsers);
            let defaultSelect = response.data.users.slice(0, 5).map((obj) => obj.id)
            setSelected(defaultSelect)
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching users:', error);
            setIsLoading(false)
        }
    };

    useEffect(() => {
        setIsLoading(true)
        fetchData();
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSearch = (keyword) => {
        setKeyword(keyword);
        fetchData();
    }

    return (
        <Box sx={style.mainBox}>
            <Container maxWidth="lg" sx={style.container}>
                {
                    isLoading
                        ?
                        <></>
                        :
                        <Grid container spacing={3} pt={5} sx={{ position: "relative" }}>
                            <Grid item sm={12} md={12} lg={12} xl={12} >
                                <Card sm={{ padding: "17px", borderRadius: 32, minHeight: "11rem" }}>
                                    <DataTable handleSearch={handleSearch} datalength={datalength} data={data || []} selected={selected} setSelected={(val) => setSelected(val)} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} setPage={setPage} page={page} />
                                </Card>
                            </Grid>
                            <Grid item sm={12} md={12} lg={12} xl={12} >
                                <DataBarChart selected={selected} data={data || []} />
                            </Grid>
                        </Grid>
                }
            </Container>
        </Box>
    )
}