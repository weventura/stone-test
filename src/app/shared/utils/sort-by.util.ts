import { SortBy } from "src/app/core/interfaces/sortby.interface";

export const SORT_BY: Array<SortBy> = [
    {
        label: 'Popularity +',
        value: 'popularity.asc'
    },
    {
        label: 'Popularity -',
        value: 'popularity.desc'
    },
    {
        label: 'Revenue +',
        value: 'revenue.asc'
    },
    {
        label: 'Revenue -',
        value: 'revenue.desc'
    },
    {
        label: 'Release Date +',
        value: 'primary_release_date.asc'
    },
    {
        label: 'Release Date -',
        value: 'primary_release_date.desc'
    },
    {
        label: 'Vote Average +',
        value: 'vote_average.asc'
    },
    {
        label: 'Vote Average -',
        value: 'vote_average.desc'
    },
    {
        label: 'Vote Count +',
        value: 'vote_count.asc'
    },
    {
        label: 'Vote Count -',
        value: 'vote_count.desc'
    }
];