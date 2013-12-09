/*
 * Script pour piloter les tests E2E
 * Il s'appuie sur une surcharge de la page index.html : bookstore_e2e.html
 * 
 * Pour lancer les tests : 
 * - http://<host>:<port>/<ctxpath>/bookstore_runner.html.jsp
 * 
 * Pour voir le veritable ecran : 
 * - ajouter un pause();
 * ou
 * - ouvrir http://<host>:<port>/<ctxpath>/bookstore_e2e.html
 */
describe('my app', function() {

	beforeEach(function() {});

	describe('App', function() {
		it('first open author', function() {
			browser().navigateTo('./#/author');
			
			expect(element('#authorList > h2').text()).toMatch('Authors list');
			expect(element('#authorList > table').count()).toBe(1);
			expect(element('#authorList > table > thead > tr > th').count()).toBe(3);
			expect(element('#authorList > table > thead > tr > th:nth-child(1)').text()).toMatch('id');
			expect(element('#authorList > table > thead > tr > th:nth-child(2)').text()).toMatch('firstName');
			expect(element('#authorList > table > thead > tr > th:nth-child(3)').text()).toMatch('lastName');
			expect(element('#authorList > table > tbody > tr').count()).toBe(0);
			
			element("#newBtn").click();
			input("oneauthor.id").enter("1");
			input("oneauthor.firstName").enter("firstName1");
			input("oneauthor.lastName").enter("lastName1");
			element("#saveBtn").click();
			
			element("#newBtn").click();
			input("oneauthor.id").enter("2");
			input("oneauthor.firstName").enter("firstName2");
			input("oneauthor.lastName").enter("lastName2");
			element("#saveBtn").click();
			
			element("#newBtn").click();
			input("oneauthor.id").enter("3");
			input("oneauthor.firstName").enter("firstName3");
			input("oneauthor.lastName").enter("lastName3");
			element("#saveBtn").click();
			
			element("#newBtn").click();
			input("oneauthor.id").enter("4");
			input("oneauthor.firstName").enter("firstName4");
			input("oneauthor.lastName").enter("lastName4");
			element("#saveBtn").click();
			
			element("#newBtn").click();
			input("oneauthor.id").enter("5");
			input("oneauthor.firstName").enter("firstName5");
			input("oneauthor.lastName").enter("lastName5");
			element("#saveBtn").click();
			
			element("#newBtn").click();
			input("oneauthor.id").enter("6");
			input("oneauthor.firstName").enter("firstName6");
			input("oneauthor.lastName").enter("lastName6");
			element("#saveBtn").click();
			

			expect(element('#authorList > h2').text()).toMatch('Authors list');
			expect(element('#authorList > table').count()).toBe(1);
			expect(element('#authorList > table > thead > tr > th').count()).toBe(3);
			expect(element('#authorList > table > thead > tr > th:nth-child(1)').text()).toMatch('id');
			expect(element('#authorList > table > thead > tr > th:nth-child(2)').text()).toMatch('firstName');
			expect(element('#authorList > table > thead > tr > th:nth-child(3)').text()).toMatch('lastName');
			expect(element('#authorList > table > tbody > tr').count()).toBe(6);
			
			
			element('#authorList > table > tbody > tr:nth-child(2) > td > a').click();
			expect(element('#id').val()).toEqual("2");
			expect(element('#firstName').val()).toEqual("firstName2");
			expect(element('#lastName').val()).toEqual("lastName2");
			input("oneauthor.firstName").enter("firstName2update");
			input("oneauthor.lastName").enter("lastName2update");
			element("#updateBtn").click();
			element("#backBtn").click();
			
			
			expect(element('#authorList > h2').text()).toMatch('Authors list');
			expect(element('#authorList > table').count()).toBe(1);
			expect(element('#authorList > table > thead > tr > th').count()).toBe(3);
			expect(element('#authorList > table > thead > tr > th:nth-child(1)').text()).toMatch('id');
			expect(element('#authorList > table > thead > tr > th:nth-child(2)').text()).toMatch('firstName');
			expect(element('#authorList > table > thead > tr > th:nth-child(3)').text()).toMatch('lastName');
			expect(element('#authorList > table > tbody > tr').count()).toBe(6);

			
			element('#authorList > table > tbody > tr:nth-child(2) > td > a').click();
			expect(element('#id').val()).toEqual("2");
			expect(element('#firstName').val()).toEqual("firstName2update");
			expect(element('#lastName').val()).toEqual("lastName2update");
			element("#removeBtn").click();


			expect(element('#authorList > h2').text()).toMatch('Authors list');
			expect(element('#authorList > table').count()).toBe(1);
			expect(element('#authorList > table > thead > tr > th').count()).toBe(3);
			expect(element('#authorList > table > thead > tr > th:nth-child(1)').text()).toMatch('id');
			expect(element('#authorList > table > thead > tr > th:nth-child(2)').text()).toMatch('firstName');
			expect(element('#authorList > table > thead > tr > th:nth-child(3)').text()).toMatch('lastName');
			expect(element('#authorList > table > tbody > tr').count()).toBe(5);
		});

		it('after open book', function() {
			element("#BookMenu").click();
			
			expect(element('#bookList > h2').text()).toMatch('Books list');
			expect(element('#bookList > table').count()).toBe(1);
			expect(element('#bookList > table > thead > tr > th').count()).toBe(10);
			expect(element('#bookList > table > thead > tr > th:nth-child(1)').text()).toMatch('id');
			expect(element('#bookList > table > thead > tr > th:nth-child(2)').text()).toMatch('publisherId');
			expect(element('#bookList > table > thead > tr > th:nth-child(3)').text()).toMatch('authorId');
			expect(element('#bookList > table > thead > tr > th:nth-child(4)').text()).toMatch('isbn');
			expect(element('#bookList > table > thead > tr > th:nth-child(5)').text()).toMatch('title');
			expect(element('#bookList > table > thead > tr > th:nth-child(6)').text()).toMatch('price');
			expect(element('#bookList > table > thead > tr > th:nth-child(7)').text()).toMatch('quantity');
			expect(element('#bookList > table > thead > tr > th:nth-child(8)').text()).toMatch('discount');
			expect(element('#bookList > table > thead > tr > th:nth-child(9)').text()).toMatch('availability');
			expect(element('#bookList > table > thead > tr > th:nth-child(10)').text()).toMatch('bestSeller');
			expect(element('#bookList > table > tbody > tr').count()).toBe(0);
			
			element("#newBtn").click();
			input("onebook.id").enter("1");
			input("onebook.isbn").enter("1");
			input("onebook.title").enter("1");
			input("onebook.price").enter("1");
			input("onebook.quantity").enter("1");
			input("onebook.discount").enter("1");
			input("onebook.availability").enter("1");
			input("onebook.bestSeller").enter("1");
			
			element("#authorSelect > div:nth-child(1)").click();
			expect(element("#authorSelect > div:nth-child(2):visible").count()).toBe(1);
			pause();
			expect(element("#authorSelect > div:nth-child(2):visible > ul").count()).toBe(7);
			
			
			// input("onebook.authorId").enter("1");
			// input("onebook.publisherId").enter("1");

			
		});

	});
	
});
