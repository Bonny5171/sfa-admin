import * as React from 'react';
import { FC, ChangeEvent } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOnOutlined';
import MailIcon from '@material-ui/icons/MailOutline';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import LocalOfferIcon from '@material-ui/icons/LocalOfferOutlined';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import { Form } from 'react-final-form';
import { TextInput, useTranslate } from 'react-admin';
import {
    endOfYesterday,
    startOfWeek,
    subWeeks,
    startOfMonth,
    subMonths,
} from 'date-fns';

// import segments from '../segments/data';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            order: -1,
            width: '15em',
            marginRight: '1em',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    listItem: {
        paddingLeft: '2em',
    },
    listItemText: {
        margin: 0,
    },
}));

const Aside: FC = props => {
    const { filterValues, setFilters } = props;
    const classes = useStyles(props);
    const translate = useTranslate();

    console.log('filterValues', filterValues)
    const setFilter = (values: any) => {
        setFilters({ ...filterValues, ...values });
    };

    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFilter({ q: event.target ? event.target.value : undefined });
    };

    const onSubmit = () => undefined;

    // defining this component here allows to skip passing filterValues and setFilter as props
    const FilterButton: FC<{ label: string; value: any }> = props => {
        const { label, value } = props;
        const isSelected = Object.keys(value).reduce(
            (acc, key) => acc && value[key] == filterValues[key], // eslint-disable-line eqeqeq
            true
        );
        const addFilter = () => {
            if (isSelected) {
                // remove the filter
                const inverseValues = Object.keys(value).reduce(
                    (acc, key) => {
                        acc[key] = undefined;
                        return acc;
                    },
                    {}
                );
                setFilter(inverseValues);
            } else {
                setFilter(value);
            }
        };
        return (
            <ListItem
                button
                onClick={addFilter}
                selected={isSelected}
                className={classes.listItem}
            >
                <ListItemText
                    primary={translate(label)}
                    className={classes.listItemText}
                />
                {isSelected && (
                    <ListItemSecondaryAction>
                        <IconButton size="small" onClick={addFilter}>
                            <CancelIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                )}
            </ListItem>
        );
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <Form onSubmit={onSubmit} initialValues={filterValues}>
                    {({ handleSubmit }) => (
                        <TextInput
                            resettable
                            helperText={false}
                            source="q"
                            label="Procurar"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon color="disabled" />
                                    </InputAdornment>
                                ),
                            }}
                            onChange={onSearchChange}
                        />
                    )}
                </Form>

                <FilterSection
                    icon={AccessTimeIcon}
                    label="Último log"
                />
                <List dense disablePadding>
                    <FilterButton
                        value={{
                            created_at: endOfYesterday().toISOString(),
                            created_at: undefined,
                        }}
                        label="Hoje"
                    />
                    <FilterButton
                        value={{
                            created_at: startOfWeek(
                                new Date()
                            ).toISOString(),
                            created_at: undefined,
                        }}
                        label="Esta semana"
                    />
                    <FilterButton
                        value={{
                            created_at: subWeeks(
                                startOfWeek(new Date()),
                                1
                            ).toISOString(),
                            created_at: startOfWeek(
                                new Date()
                            ).toISOString(),
                        }}
                        label="Semana Anterior"
                    />
                    <FilterButton
                        value={{
                            created_at: startOfMonth(
                                new Date()
                            ).toISOString(),
                            created_at: undefined,
                        }}
                        label="Este mês"
                    />
                    <FilterButton
                        value={{
                            created_at: subMonths(
                                startOfMonth(new Date()),
                                1
                            ).toISOString(),
                            created_at: startOfMonth(
                                new Date()
                            ).toISOString(),
                        }}
                        label="Mês passado"
                    />
                    <FilterButton
                        value={{
                            created_at: undefined,
                            created_at: subMonths(
                                startOfMonth(new Date()),
                                1
                            ).toISOString(),
                        }}
                        label="Mais cedo"
                    />
                </List>

                <FilterSection
                    icon={ErrorOutline}
                    label="Tem erro"
                />
                <List dense disablePadding>
                    <FilterButton
                        value={{ has_ordered: true }}
                        label="Sim"
                    />
                    <FilterButton
                        value={{ has_ordered: false }}
                        label="Não"
                    />
                </List>

                {/* <FilterSection
                    icon={MailIcon}
                    label="Tem newsletter"
                />
                <List dense disablePadding>
                    <FilterButton
                        value={{ has_newsletter: true }}
                        label="ra.boolean.true"
                    />
                    <FilterButton
                        value={{ has_newsletter: false }}
                        label="ra.boolean.false"
                    />
                </List> */}

                {/* <FilterSection
                    icon={LocalOfferIcon}
                    label="Segmento"
                /> */}

                {/* <List dense disablePadding>
                    {segments.map(segment => (
                        <FilterButton
                            value={{ groups: segment.id }}
                            label={segment.name}
                            key={segment.id}
                        />
                    ))}
                </List> */}
            </CardContent>
        </Card>
    );
};

const FilterSection: FC<{ label: string; icon: FC }> = ({
    label,
    icon: Icon,
}) => {
    const translate = useTranslate();
    return (
        <Box mt={2} display="flex" alignItems="center">
            <Box mr={1}>
                <Icon />
            </Box>
            <Typography variant="overline">{translate(label)}</Typography>
        </Box>
    );
};

export default Aside;