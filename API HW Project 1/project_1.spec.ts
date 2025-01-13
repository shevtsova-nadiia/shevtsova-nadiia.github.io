import { test, expect } from '../../fixtures/test-data-fixtures'; 
import compareResponseWithRequest from '../../helpers/compareResponseWithRequest';


test.describe.configure({ mode: 'serial' });

test.describe("Project 1", () => {

  let studentID;

    test('Get All Students', async ({ request }) => {
        let count = 0;
        const response = await request.get(process.env.API_ENDPOINT!)
        const responseBody = await response.json()
        expect(response.status()).toBe(200)
        expect(responseBody.length).toBeGreaterThanOrEqual(2)
        responseBody.forEach(elStudent => {
            expect(elStudent).toHaveProperty('STUDENT_ID')
        })    
    });
    test('Create a New Student', async ({ request, projectNewStudent }) => {
        const response = await request.post(process.env.API_ENDPOINT!, {
            data: projectNewStudent
        })
        expect(response.status()).toBe(201)
        const responseBody = await response.json()
        studentID = responseBody.STUDENT_ID
    });
    test('Get Newly Created Student', async ({ request, projectNewStudent }) => {
        const response = await request.get(`${process.env.API_ENDPOINT}/${studentID}`)
        expect(response.status()).toBe(200)
        const responseBody = await response.json()
        compareResponseWithRequest(responseBody, projectNewStudent)
    });
    test('Update Newly Created Student with a Different Instructor', async ({ request, updateProjectNewStudent }) => {
        const response = await request.put(`${process.env.API_ENDPOINT}/${studentID}`, {
            data: updateProjectNewStudent
        })
        expect(response.status()).toBe(200)
        const responseBody = await response.json()
        expect(responseBody.message).toBe(`Successfully updated the student with the STUDENT_ID: ${ studentID }`)
    });
    test('Delete Newly Created Student', async ({ request }) => {
        const response = await request.delete(`${process.env.API_ENDPOINT}/${studentID}`)
        expect(response.status()).toBe(204)
    })
})