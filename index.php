<header>
	<h1>WP Live Search</h1>
</header>

<div class="search-box">
	<label for="js-search" class="sr-only">Search</label>
	<input type="search" id="js-search" class="form-control" value="" name="search" placeholder="Start typing..." />
	<span class="search-icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
	</span>
</div>

<div class="posts-wrapper" aria-live="assertive">
	<div class="loader d-none"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/loader.svg" alt="loading..." /></div>
	<div id="js-results-wrapper">
		<!-- ajax posts in here -->
	</div>
</div>