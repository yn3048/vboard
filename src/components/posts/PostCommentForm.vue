<template>
  <form>
    <div class="mb-3">
      <label for="comment" class="form-label">댓글</label>
      <textarea
        required
        :value="content"
        @input="$emit('update:content', $event.target.value)"
        class="form-control commentArea"
        id="comment"
        rows="3"
      ></textarea>
    </div>
    <div class="commentBtn">
      <slot name="actions"></slot>
    </div>
  </form>
</template>

<script setup>
defineProps({
  content: String,
});

defineEmits(['update:content']);
</script>

<style>
.commentBtn {
  text-align: end;
}
</style>
