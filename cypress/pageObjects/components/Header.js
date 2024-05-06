class Header {
    constructor() {
        //***** DOM Elements *****//

        this.burgerMenuButton = () =>
            cy.get('#topbar-menu').find('.cl-navbar-toggler');
        this.logo = () => cy.get('[aria-label="Clockify Logo"]');
        this.requestDemoButton = () =>
            cy.get('[data-testid="contact-for-demo"]');
        this.hideRequestDemoButton = () =>
            cy.get('[data-testid="discard-contact-for-demo"]');
        this.workspaceDropdownButton = () =>
            cy.get('[data-cy="workspace-dropdown"]');
        this.upgradeLink = () => cy.get('[data-testid="upgrade-link"]');
        this.profileButton = () => cy.get('app-user-settings');
        this.addonLink = () => {
            return cy
                .get(
                    '.cl-dropdown-toggle.cl-no-arrow.cl-component-divided-left'
                )
                .eq(0);
        };
        this.notificationsButton = () => {
            return cy
                .get(
                    '.cl-dropdown-toggle.cl-no-arrow.cl-component-divided-left'
                )
                .eq(2);
        };
        this.helpDropdownButton = () => {
            return cy
                .get(
                    '.cl-dropdown-toggle.cl-no-arrow.cl-component-divided-left'
                )
                .eq(1);
        };

        // Workspace drop-down component elements
        this.workspaceDropDown = {
            manageWorkspacesLink: () =>
                cy.get('[data-testid="manage-workspaces-link"]'),
            workspaceItem: (workspaceName) =>
                cy.get(`[data-cy=${workspaceName}]`)
        };
        this.profileButton = () => {
            return cy
                .get('#topbar-menu')
                .find('.cl-dropdown.cl-component-divided-left.cl-pr-0');
        };

        // Help drop-down component elements
        this.helpDropdown = {
            documentationLink: () => {
                return cy
                    .get('#support-links-scroll')
                    .find('a:contains("Documentation ")');
            },
            tutorialsLink: () => {
                return cy
                    .get('#support-links-scroll')
                    .find('a:contains("Tutorials ")');
            },
            contactLink: () => {
                return cy
                    .get('#support-links-scroll')
                    .find('a:contains("Contact ")');
            }
        };

        // Notification drop-down component elements
        this.notificationDropdown = {
            clearAllButton: () => {
                return cy.get(
                    '.cl-dropdown-notification-clear-all.cl-small.cl-color-blue.ng-star-inserted'
                );
            },
            notificationItem: (notificationTitle) => {
                return cy
                    .get(
                        '.cl-dropdown-item.cl-dropdown-item__no-hover.cl-notification.ng-star-inserted'
                    )
                    .contains(notificationTitle);
            },
            clearNotificationButton: () => {
                return this.notificationDropdown
                    .notificationItem(notificationTitle)
                    .find('[alt="Delete dark crossmark"]');
            }
        };

        // Profile dop-down component elements
        this.profileDropdown = {
            dropdownComponent: () => cy.get('.cl-dropdown-menu-user-profile'),
            profileSettingsLink: () => {
                return this.profileDropdown
                    .dropdownComponent()
                    .find('a:contains("Profile settings")');
            },
            darkThemeToggle: () => {
                return this.profileDropdown
                    .dropdownComponent()
                    .find('div:contains("Dark theme")');
            },
            downloadAppsLink: () => {
                return this.profileDropdown
                    .dropdownComponent()
                    .find('a:contains("Download apps")');
            },
            tryChatAppLink: () => {
                return this.profileDropdown
                    .dropdownComponent()
                    .find('a:contains("Try chat app")');
            },
            logoutLink: () => cy.get('[data-cy="logout"]')
        };
    }
}

const header = new Header();
export default header;
