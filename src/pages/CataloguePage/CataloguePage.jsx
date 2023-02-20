import { CardList } from '../../components/CardList/CardList';
import { Sort_nav } from '../../components/Sort_nav/Sort_nav';
import { getIssues } from '../../utils/utils';

export const CataloguePage = ({searchQuery, items, currentUser, handleProductLike, setParentCounter}) => {
  return <>
      <Sort_nav/>
      {searchQuery && (
          <p>
            По запросу {searchQuery} найдено {items.length}
            {getIssues(items.length)}
          </p>
        )}
        <CardList
          currentUser={currentUser}
          handleProductLike={handleProductLike}
          setParentCounter={setParentCounter}
          items={items}
        />
  </>
};
