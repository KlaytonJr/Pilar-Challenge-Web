import type DiscoverQuery from '@/query/DiscoverQuery'
import { Get } from './BaseService'

const SearchService = {
  getSearch: (query?: DiscoverQuery) => {
    return Get(`/search/multi`, query)
  },
}

export default SearchService
