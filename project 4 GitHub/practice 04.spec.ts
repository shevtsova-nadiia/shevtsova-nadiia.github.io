import { link } from "fs";
import { test, expect } from "../../fixtures/github-fixtures";
import { GitHubHomePage } from "../../pages/GitHubHomePage";
import { GitHubLoginPage } from "../../pages/GitHubLoginPage";

test.describe('Practice04 GitHub HomePage', () => {

    test('TASK-1: Validate the GitHub Home Page Logo and Header Menu Items', async({ gitHubHomePage }) => {   
        await test.step('2. Validate that the logo is displayed', async() => {
            await expect(gitHubHomePage.logo).toBeVisible();
        });
        await test.step('3. Validate that the header menu items are displayed with their expected texts', async() => {
            const menuHeaderItemsArr = [ 'Product', 'Solutions', 'Resources', 'Open Source', 'Enterprise', 'Pricing' ];           
            await expect(gitHubHomePage.headerMenuItems).toContainText(menuHeaderItemsArr); // What could be a better assertion???
        });
    });

    test('TASK-2: Validate the GitHub Home Page Search and Signing Header Items', async({ gitHubHomePage }) => {       
        await test.step('2. Validate that the search input is displayed with the placeholder "Search or jump to..."', async() => {
            //await expect(gitHubHomePage.searchInput).toBeVisible()
            await expect(gitHubHomePage.searchInput).toHaveAttribute('placeholder', 'Search or jump to...')
        });
        await test.step('3. Validate that the sign in button is displayed with the text "Sign in"', async() => {
            //await expect(gitHubHomePage.signInButton).toBeVisible();
            await expect(gitHubHomePage.signInButton).toContainText(' Sign in ');
        });
        await test.step('3. Validate that the sign up button is displayed with the text "Sign up"', async() => {
            //await expect(gitHubHomePage.signUpButton).toBeVisible();
            await expect(gitHubHomePage.signUpButton).toContainText(' Sign up ');
        });
    });

    test('TASK-3: Validate the GitHub Login Page Sign in Form', async({ gitHubLoginPage }) => {        
        await test.step('3. Validate that the header logo is displayed', async() => {
            await expect(gitHubLoginPage.headerLogo).toBeVisible()
        })
        await test.step('4. Validate that the form header is displayed with the text "Sign in to GitHub"', async() => {
            await expect(gitHubLoginPage.formHeader).toBeVisible()
            await expect(gitHubLoginPage.formHeader).toHaveText('Sign in to GitHub')
        })
        await test.step('5,7. Validate that the username and password labels are displayed', async () => {
            const labels = ['Username or email address', 'Password']
            const userNamePasswordLabelAll = await gitHubLoginPage.userNamePasswordLabel.all()
            for (const label of userNamePasswordLabelAll) {
            await expect(label).toBeVisible()
            }
            await expect(gitHubLoginPage.userNamePasswordLabel).toHaveText(labels)
        })
        await test.step('6,8. Validate that the username and password inputs are displayed and enabled', async() => {
            const userNamePasswordInputAll = await gitHubLoginPage.userNamePasswordInput.all()
            for(const input of userNamePasswordInputAll) {
            await expect(input).toBeVisible()
            await expect(input).toBeEnabled()
            }
        })
        await test.step('9. Validate that the forgot password link is displayed with the text "Forgot password?"', async() => {
            await expect(gitHubLoginPage.passwordLink).toBeVisible()
            await expect(gitHubLoginPage.passwordLink).toHaveText('Forgot password?') 
        })
        await test.step('10. Validate that the sign in button is displayed with the text "Sign in"', async() => {
            await expect(gitHubLoginPage.loginSignInButton).toBeVisible()
            await expect(gitHubLoginPage.loginSignInButton).toHaveText('Sign in') 
        })
        await test.step('11,12. Validate that the sign in with a passkey button and account link are displayed with the text ', async() => {
            const links = ['Sign in with a passkey', 'Create an account']
            const passKeyAnAccountLinkAll = await gitHubLoginPage.passKeyAnAccountLink.all()
            for(const link of passKeyAnAccountLinkAll){
            await expect(link).toBeVisible()
            }
            await expect(gitHubLoginPage.passKeyAnAccountLink).toContainText(links)
        })
    })
// 2 way
    test('TASK-3', async({ gitHubLoginPage }) => {  
        const allText = [
            'Sign in to GitHub',
            'Username or email address',
            'Password',
            'Forgot password?',
            'Sign in',
            'Sign in with a passkey',
            'Create an account']
        const allLocator = [
            gitHubLoginPage.formHeader,
            gitHubLoginPage.userNameLabel,
            gitHubLoginPage.passwordLabel,
            gitHubLoginPage.passwordLink,
            gitHubLoginPage.loginSignInButton,
            gitHubLoginPage.passkeyLink,
            gitHubLoginPage.createAnAccountLink
            ]
        for (let i = 0; i < allLocator.length; i++) {
            await expect(allLocator[i]).toBeVisible()
            await expect(allLocator[i]).toHaveText(allText[i])
            
        }        
    });
    test('TASK-4: Validate the GitHub Login Page Footer Links', async({ gitHubLoginPage}) => {
        const arrFooterLink = ['Terms', 'Privacy', 'Docs', 'Contact GitHub Support', 'Manage cookies', 'Do not share my personal information']
        const footerLinksAll = await gitHubLoginPage.footerLinks.all()
        for(const link of footerLinksAll){
            await expect(link).toBeVisible()
        }
            await expect(gitHubLoginPage.footerLinks).toHaveText(arrFooterLink)
    })
    test('TASK-5: Validate the GitHub Login Page Invalid Login Attempt', async({gitHubLoginPage}) => {
        const infoUser = ['johndoe', 'test1234']
        for (let i = 0; i < infoUser.length; i++) {
            await gitHubLoginPage.userNamePasswordInput.nth(i).fill(infoUser[i])  
        }
        await gitHubLoginPage.clickloginSignInButton()
        await expect(gitHubLoginPage.errorMessage).toContainText('Incorrect username or password.')
    })
});