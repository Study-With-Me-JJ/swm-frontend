import FilterSelect from './ui/FilterSelect';

export default function FilterCategory() {
    const options = [
        { value: 'all', label: '카테고리 전체' },
        { value: 'study', label: '스터디' },
        { value: 'project', label: '프로젝트' },
    ]

    return <FilterSelect options={options} defaultValue='카테고리 전체' />
}