export const getTextByAdminLevel = (level, isReviewer) => {
    switch (level) {
        case 0:
            if(isReviewer) return 'Reviewer'
            return 'User'
        case 1:
            return 'Admin'
        case 2:
            return 'Head Admin'
        case 3:
            return 'Owner'
        default: 
        return 'User'
    }
}