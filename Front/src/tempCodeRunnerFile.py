import requests
import json
import time

# Google Books API endpoint
base_url = "https://www.googleapis.com/books/v1/volumes"

# API key (replace with your actual API key)
api_key = "AIzaSyDhSkvDAAMDbmvoVAod9FB4SRFCU5fD-dE"

# Parameters for the request
params = {
    "q": "language:english",
    "maxResults": 40,  # Number of results per page (maximum is 40)
    "key": api_key
}

total_books = 0  # Counter for total books downloaded

# Loop through pages of results
for page in range(0, 1000, 40):  # Adjust range to download desired number of books
    params["startIndex"] = page
    # Make the GET request
    response = requests.get(base_url, params=params)

    # Check if the request was successful
    if response.status_code == 200:
        # Process the response data (extract book details)
        data = response.json()
        books = []
        for item in data.get("items", []):
            books.append(item)  # Save all book information

        # Write the data to a JSON file for each page
        with open(f"english_books_page_{page}.json", "w") as json_file:
            json.dump(books, json_file, indent=4)

        total_books += len(books)

        print(f"Page {page//40 + 1} - Data has been written to 'english_books_page_{page}.json' file.")

        # Pause for a short time to avoid hitting rate limits
        time.sleep(1)
    else:
        print(f"Error: {response.status_code}")

print(f"Total books downloaded: {total_books}")
