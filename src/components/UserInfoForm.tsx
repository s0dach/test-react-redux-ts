import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {LinearProgress, styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {GetChargesExt, GetSubscrsExt} from "../store/reducers/ActionCreators";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';


const defaultTheme = createTheme();
const UserInfoForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const {userInfo, isLoading} = useAppSelector(state => state.userInfo);
    // const {results} = useAppSelector(state => state.getCharges);
    const [beginDate, setBeginDate] = useState<any>('');
    const [endDate, setEndDate] = useState<any>('');

    // const [lastBeginDate, setLastBeginDate] = useState('');
    // const [endBeginDate, setEndBeginDate] = useState('');

    useEffect( () => {
        const userToken = localStorage.getItem('userToken');
        if (userToken !== null) {
            dispatch(GetSubscrsExt(userToken));
        } else {
            navigate('/login')
        }
    }, []);

    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
    ) {
        return {name, calories, fat, carbs, protein};
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    const isValidDate = (beginDate: { $y: string, $M: number }, endDate: { $y: string, $M: number }) => {
        const begin: Date = new Date(parseInt(beginDate.$y), beginDate.$M + 1);
        const end: Date = new Date(parseInt(endDate.$y), endDate.$M + 1);

        let beginYear = begin.getFullYear();
        let beginMonth = ("0" + (begin.getMonth() + 1)).slice(-2);
        let beginFormattedDate = beginYear + beginMonth;

        let endYear = end.getFullYear();
        let endMonth = ("0" + (end.getMonth() + 1)).slice(-2);
        let endFormattedDate = endYear + endMonth;

        // setLastBeginDate(beginFormattedDate);
        // setEndBeginDate(endFormattedDate);

        if (end.getTime() > begin.getTime()) {
            const userToken = localStorage.getItem('userToken');
            const data = {
                ExtToken: userToken,
                PeriodBegin: beginFormattedDate,
                PeriodEnd: endFormattedDate,
            }
            dispatch(GetChargesExt(data));
        }
    }

    useEffect(() => {
        isValidDate(beginDate, endDate);
    }, [endDate]);

    return (
        <ThemeProvider theme={defaultTheme}>
            {isLoading && <LinearProgress/>}
            {userInfo.success && <CustomItemComponent>
                <CustomBlock>
                    <Typography component="h5" variant="h5">
                        Начисления
                    </Typography>
                    <CustomMainBlock>
                        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                            <Grid item xs={6}>
                                <Item>{userInfo.results[0].Address}</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>{userInfo.results[0].FIO}</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>{userInfo.results[0].OrgId}</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>{userInfo.results[0].SubscrCode}</Item>
                            </Grid>
                            <Grid item xs={12}>
                                <Item>{userInfo.results[0].SubscrId}</Item>
                            </Grid>
                        </Grid>
                    </CustomMainBlock>
                    <CustomDateBlock>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker views={['month', 'year']} label="Период с"
                                            onChange={(newValue) => setBeginDate(newValue)}/>
                                <DatePicker
                                    label="Период по"
                                    views={['month', 'year']}
                                    onChange={(newValue) => setEndDate(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </CustomDateBlock>
                    <TableContainer component={Paper} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 800}}>Период</TableCell>
                                    <TableCell sx={{fontWeight: 800}} align="right">К оплате на начало
                                        месяца</TableCell>
                                    <TableCell sx={{fontWeight: 800}} align="right">Начислено</TableCell>
                                    <TableCell sx={{fontWeight: 800}} align="right">Оплачено</TableCell>
                                    <TableCell sx={{fontWeight: 800}} align="right">К оплате</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableHead>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CustomBlock>
            </CustomItemComponent>}
        </ThemeProvider>
    );
};

export default UserInfoForm;

const CustomItemComponent = styled("div")({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8
});

const CustomDateBlock = styled("div")({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
});

const CustomBlock = styled("div")({
    padding: 20,
    background: '#cfedfb'
});

const CustomMainBlock = styled("div")({
    display: 'flex',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    background: '#3d9cc9'
});

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));