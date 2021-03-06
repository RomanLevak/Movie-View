import {createSelector} from 'reselect'

const getUser = state => state.user

const selectUser = createSelector(
    getUser,
    user => {
        if(user.entity)
            return {
                entity: {
                    name: user.entity.displayName,
                    email: user.entity.email,
                    id: user.entity.id,
                    lists: user.entity.lists
                },
                loading: user.loading,
                error: user.error
            }

        return {
            entity: {},
            loading: user.loading,
            error: user.error
        }
    }
)

export const isSignedIn = createSelector(
    getUser,
    user => Boolean(user.entity.id)
)

export default selectUser
